import mongoose from "mongoose";
const { connect } = mongoose;
import { v4 as uuidv4 } from "uuid";
import Apikey from "../model/rbgApiKey.model.js";
import dotenv from "dotenv";
dotenv.config();

console.log(Apikey);
connect(process.env.DB || "mongodb://127.0.0.1:27017/bg-changer-telebot")
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
