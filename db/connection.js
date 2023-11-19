const { default: mongoose } = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

const connectDb = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("DB connected!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
