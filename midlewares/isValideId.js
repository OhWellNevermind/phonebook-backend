const { isValidObjectId } = require("mongoose");

const idIsValid = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Id is not valid" });
  }
  next();
};

module.exports = idIsValid;
