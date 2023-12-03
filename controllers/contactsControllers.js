const {
  getAllContacts,
  addContact,
  removeContact,
} = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {
  try {
    const user = req.user;
    const contacts = await getAllContacts(user._id);
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const user = req.user;
    const newContact = await addContact(req.body, user._id);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.contactId;
    const removedContact = await removeContact(id, user._id);
    if (!removedContact) {
      res.status(404).json({ message: "Contact with that id not found!" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getContactsController,
  addContactController,
  removeContactController,
};
