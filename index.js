"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const {
  callbackQueryHandler,
  processCommand,
  processDocOrPhotoData,
} = require("./controllers");
require("dotenv").config();

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

app.get("/", (req, res) => {
  res.status(200).send({
    message: "OK, There is nothing to do...",
  });
});

app.post("/", async (req, res) => {
  try {
    const callbackQuery = req.body.callback_query;
    await callbackQueryHandler(callbackQuery);
    const isMessage = req.body?.message;
    if (isMessage)
      !isMessage?.text
        ? await processDocOrPhotoData(req.body)
        : await processCommand(req.body);
    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
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

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
