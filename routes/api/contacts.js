const express = require("express");
const { validateData } = require("../../decorators/contactsDecorator");
const {
  getContactsController,
  addContactController,
  removeContactController,
} = require("../../controllers/contactsControllers");

const { contactSchema } = require("../../schemas/contactsSchemas");
const isValidId = require("../../midlewares/isValideId");

const router = express.Router();

router.get("/", getContactsController);

router.post("/", validateData(contactSchema), addContactController);

router.delete("/:contactId", isValidId, removeContactController);

module.exports = router;
