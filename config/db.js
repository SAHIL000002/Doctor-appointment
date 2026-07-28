const mongoose = require("mongoose");

const connectdb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (error) {
    console.log("unable to connect db");
  }
};

module.exports = connectdb;
