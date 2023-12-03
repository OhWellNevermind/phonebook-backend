const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.comparePasswords = async function (password) {
  const isPasswrodEqual = await bcrypt.compare(password, this.password);
  return isPasswrodEqual;
};

const User = model("user", userSchema);

module.exports = User;
