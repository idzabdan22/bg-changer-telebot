"use strict";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
const { connect } = mongoose;
import bp from "body-parser";
const { urlencoded, json } = bp;
const app = express();
import mainRouter from "../router/main.router.js";
import paymentRouter from "../router/payment.router.js";

const dbUrl = process.env.DB;

// console.log(dbUrl);

connect(dbUrl)
  .then((res) => {
    console.log("Success Connect to MongoDB");
    // console.log(res)
  })
  .catch((err) => {
    console.log("Failed Connect to MongoDB", err);
  });

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/", mainRouter);
app.use("/payment", paymentRouter);

app.all("*", (req, res, next) => {
  // next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no, Something went wrong!";
  res.status(status).render("error", { err });
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
