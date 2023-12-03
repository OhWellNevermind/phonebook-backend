const { Schema, model } = require("mongoose");

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    versionKey: false,
  }
);

const Contact = model("contact", contactScheme);

module.exports = Contact;
