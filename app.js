"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const mainRouter = require("./router/main.router");
const paymentRouter = require("./router/payment.router");

const dbUrl = "mongodb://127.0.0.1:27017/bg-changer-telebot";

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

app.use("/", mainRouter);
app.use("/payment", paymentRouter);

app.all("*", (req, res, next) => {
  // next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no, Something went wrong!";
  res.status(status).render("error.ejs", { err });
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
