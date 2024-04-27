const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.DB_URL;

const connect_db = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected successfully.");
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = connect_db;