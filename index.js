"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const Path = require("path");
const { User, Data, History } = require("./model");
const {
  sendMessage,
  getTelegramFilePath,
  callbackQueryHandler,
  checkUser,
} = require("./controllers");
const processCommand = require("./controllers/processCommand");
const processDocOrPhotoData = require("./controllers/processPhotoData");

require("dotenv").config();

(async () => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/setWebhook`,
      {
        url: "https://653a-158-140-175-221.ngrok.io",
      }
    );
    console.log("SUCCESS FORWARDING");
  } catch (e) {
    console.log(e);
  }
})();

const dbUrl = process.env.DB || "mongodb://127.0.0.1:27017/bg-changer-telebot";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Success Connect to MongoDB");
  })
  .catch((err) => {
    console.log("Failed Connect to MongoDB", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const callbackQuery = req.body.callback_query;
    await callbackQueryHandler(callbackQuery);
    const isMessage = req.body?.message;
    if (isMessage)
      !isMessage?.text
        ? await processDocOrPhotoData(req.body)
        : await processCommand(req.body);
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/payment/handling", async (req, res) => {
  console.log(req.body);
  res.send("OKEEEEEEEE");
});

app.post("/payment/unfinish", async (req, res) => {
  console.log("REDIRECTTTTTTTTTTTTTTTTTTTT");
  console.log(req.body);
  res.send("OKEEEEEEEE");
});

app.listen(process.env.PORT, "localhost", () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
