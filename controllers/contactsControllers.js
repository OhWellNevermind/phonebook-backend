const {
  getAllContacts,
  addContact,
  removeContact,
} = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const removedContact = await removeContact(id);
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
