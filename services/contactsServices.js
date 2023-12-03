const Contact = require("../db/models/contactModel");

const getAllContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const addContact = async (data, owner) => {
  const newContact = await Contact.create({ ...data, owner });
  return newContact;
};

const removeContact = async (id, owner) => {
  const removedContact = await Contact.findOneAndDelete({ _id: id, owner });
  console.log(owner);
  console.log(removedContact);
  return removedContact;
};

module.exports = {
  getAllContacts,
  addContact,
  removeContact,
};
