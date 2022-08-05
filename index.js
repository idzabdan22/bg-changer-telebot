"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const Path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const { send } = require("process");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function processBackroundPhoto(chat_id, data) {
  const { tel_file_path, bg_color } = data;
  const imageUrl = `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${tel_file_path}`;

  const response = await axios.get(imageUrl, {
    responseType: "stream",
  });
  const path = `${__dirname}/photos/${chat_id}.jpg`;
  const writeStream = fs.createWriteStream(path);
  response.data.pipe(writeStream);
  writeStream.on("finish", () => {
    writeStream.close();
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append(
      "image_file",
      fs.createReadStream(path),
      Path.basename(path)
    );
    if (bg_color !== "transparent") formData.append("bg_color", bg_color);
    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVEBG_TOKEN,
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status != 200);
        fs.writeFileSync(path, response.data);
        const teleForm = new FormData();
        teleForm.append("chat_id", chat_id);
        teleForm.append(
          "photo",
          fs.createReadStream(path),
          Path.basename(path)
        );
        axios({
          method: "post",
          url: `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendPhoto`,
          data: teleForm,
        })
          .then((response) => {
            // fs.unlink(path, (err) => {
            //   if (err) return console.log(err);
            // });
          })
          .catch((error) => {
            sendMessage(chat_id, "Oops, seems like server error...", null);
          });
      })
      .catch((error) => {
        sendMessage(chat_id, "Oops, seems like wrong color...", null);
      });
  });
  return path;
}

async function getFilePath(file_id) {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/getFile?file_id=${file_id}`
    );
    return response.data.result.file_path;
  } catch (error) {
    console.error("Cannot get file path");
  }
}

async function sendMessage(chat_id, replyText, keyboardData) {
  try {
    const data = !keyboardData
      ? {
          chat_id: chat_id,
          text: replyText,
        }
      : {
          chat_id: chat_id,
          text: replyText,
          reply_markup: keyboardData,
        };
    await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendMessage`,
      data
    );
    return true;
  } catch (error) {
    throw new Error("Error");
  }
}

app.post("/", async (req, res) => {
  try {
    const chat_id = req.body.message.from.id;
    if (req.body.message.text) {
      const message = req.body.message.text;
      if (message.match(new RegExp("/*"))) {
        switch (message) {
          case "/start":
            sendMessage(
              chat_id,
              "Hello, greeting from bot!\nJust send an image, and i will change your background image!\nChanging backround is so easy with this bot!\nLet's get rock!",
              null
            );
            sendMessage(
              chat_id,
              "Send me an image with 10 MB of maximum file size",
              null
            );
            break;
          default:
            const data = fs.readFileSync(
              `${__dirname}/database/${chat_id}.txt`,
              "utf8"
            );
            const userData = JSON.parse(data);
            if (!userData.tel_file_path) {
              sendMessage(chat_id, "Oops, what are you doin' mate!...");
            } else {
              userData.bg_color = message.toLowerCase();
              sendMessage(
                chat_id,
                "Take a breath, your result will be ready in a while;)"
              );
              processBackroundPhoto(chat_id, userData);
              fs.writeFile(
                `${__dirname}/database/${chat_id}.txt`,
                JSON.stringify(userData),
                function (err) {
                  if (err) return console.log(err);
                  console.log("SUCCESS WRITE AGAIN TO DB");
                }
              );
            }
            break;
        }
      } else {
        sendMessage(chat_id, "Oops, what are you doin' mate!!!!!...");
      }
    } else {
      if (
        !(
          "photo" in req.body.message ||
          ("document" in req.body.message &&
            req.body.message.document.mime_type !== "application/zip")
        )
      ) {
        sendMessage(chat_id, "Oops, that is not i expected...");
      } else {
        const photoArr = req.body.message.photo;
        const file_id = !photoArr
          ? req.body.message.document.file_id
          : req.body.message.photo[photoArr.length - 1].file_id;
        const telFilePath = await getFilePath(file_id); // needs await keyword
        fs.writeFile(
          `${__dirname}/database/${chat_id}.txt`,
          `{"tel_file_path": "${telFilePath}"}`,
          function (err) {
            if (err) return console.log(err);
            console.log("SUCCESS WRITE TO DB");
          }
        );
        sendMessage(
          chat_id,
          "Choose Backround Color below:\nOr type the hex color code / color name",
          {
            keyboard: [
              [
                {
                  text: "Green",
                },
                {
                  text: "Red",
                },
                {
                  text: "Blue",
                },
              ],
              [
                {
                  text: "Black",
                },
                {
                  text: "White",
                },
                {
                  text: "Transparent",
                },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        );
      }
    }
    res.send("OK");
  } catch (error) {
    res.send("Internal Server Error");
  }
});

app.listen(port, "localhost", () => {
  console.log(`LISTENING ON PORT ${port}`);
});
