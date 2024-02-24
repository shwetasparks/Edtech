//start from here: mongoose db connection

const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.mongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connected successfully"))
    .catch((error) => {
      console.log("db connected failed");
      console.log(error);
      process.exit(1);
    });
};
