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
    const chat_id = req.body.message.from.id;
    callbackQueryHandler(callbackQuery);
    if (req.body.message.text) {
      const message = req.body.message.text;
      if (message.match(new RegExp("/[a-zA-Z]+"))) {
        switch (message) {
          case "/start":
            checkUser(req.body.message.from);
            const res = await sendMessage({
              chat_id: chat_id,
              text: "Hello, greeting from bot!\nJust send an image, and i will change your background image!\nChanging backround is so easy with this bot!\nLet's get rock!",
            });
            if (res === 200) {
              sendMessage({
                chat_id: chat_id,
                text: "Send me an image with 10 MB of maximum file size",
              });
            }
            break;
          default:
            break;
        }
      } else {
        sendMessage({
          chat_id: chat_id,
          text: "Wrong Command!",
        });
      }
    } else {
      const validType = ["image/jpeg", "image/png", "image/jpg"];
      if (
        !(
          "photo" in req.body.message ||
          ("document" in req.body.message &&
            validType.includes(req.body.message.document.mime_type))
        )
      ) {
        const res = await sendMessage({
          chat_id: chat_id,
          text: "Oops, that is not i expected...",
        });

        if (res === 200) {
          sendMessage({
            chat_id: chat_id,
            text: "Try again, sending file within these format: JPEG, PNG, JPG.",
          });
        }
      } else {
        const photoArr = req.body.message.photo;
        const file_id = !photoArr
          ? req.body.message.document.file_id
          : req.body.message.photo[photoArr.length - 1].file_id;
        const file_url = await getTelegramFilePath(file_id);
        const file_type = !photoArr ? "document" : "photo";

        const res = await sendMessage({
          chat_id: chat_id,
          text: "Choose our favorite backround color below:",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Red",
                  callback_data: `red,${file_type},${file_url}`,
                },
                {
                  text: "Blue",
                  callback_data: `blue,${file_type},${file_url}`,
                },
                {
                  text: "Green",
                  callback_data: `green,${file_type},${file_url}`,
                },
              ],
              [
                {
                  text: "White",
                  callback_data: `white,${file_type},${file_url}`,
                },
                {
                  text: "Black",
                  callback_data: `black,${file_type},${file_url}`,
                },
                {
                  text: "Transparent",
                  callback_data: `${null},${file_type},${file_url}`,
                },
              ],
            ],
          },
        });
        if (res === 200) {
          sendMessage({
            chat_id: chat_id,
            text: "Or type the hex color code (ex: 81d4fa) / the color name (ex: purple)",
          });
        }
      }
    }
    res.send("OK");
  } catch (error) {
    res.send("Internal Server Error");
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
