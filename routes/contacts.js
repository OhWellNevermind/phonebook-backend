const express = require("express");
const { validateData } = require("../decorators/contactsDecorator");
const {
  getContactsController,
  addContactController,
  removeContactController,
} = require("../controllers/contactsControllers");
const checkToken = require("../midlewares/checkToken");

const { contactSchema } = require("../schemas/contactsSchemas");
const isValidId = require("../midlewares/isValideId");

const router = express.Router();

router.get("/", checkToken, getContactsController);

router.post("/", validateData(contactSchema), checkToken, addContactController);

router.delete("/:contactId", checkToken, isValidId, removeContactController);

module.exports = router;
