const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Apikey, User } = require("../model");
require("dotenv").config();


mongoose
  .connect("mongodb://127.0.0.1:27017/bg-changer-telebot")
  .then(() => {
    console.log("Success Connect to MongoDB");
  })
  .catch((err) => {
    console.log("Failed Connect to MongoDB", err);
  });

const seedDB = async () => {
  // await Apikey.deleteMany({});
  for (let index = 0; index < 5; index++) {
    const randomNum = Math.floor(Math.random() * 6);
    const api_key = new Apikey({
      key: uuidv4(),
      api_credit: randomNum,
    });
    await api_key.save();
    // const user = new User({
    //   key: uuidv4(),
    //   first_name: "abdan",
    //   last_name: "idza",
    //   username: "danidzz",
    //   is_bot: false,
    //   credit: randomNum,
    // });
    // await user.save();
  }
};

seedDB();
