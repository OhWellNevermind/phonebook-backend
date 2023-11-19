const Contact = require("../db/models/contactModel");

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

const removeContact = async (id) => {
  const removedContact = await Contact.findByIdAndDelete(id);
  return removedContact;
};

module.exports = {
  getAllContacts,
  addContact,
  removeContact,
};
