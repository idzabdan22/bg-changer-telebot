const axios = require("axios");
const fs = require("fs");
const { User, History, Apikey } = require("../../model/index.model");
const TFunc = require("../telegram");
const apiKeyGenerator = require("./apiKeyGenerator");
const removeBackground = require("./removeBackground");
const Path = require("path");
const PaymentFunc = require("../payment");
const UserFunc = require("../user");
const imageResizer = require("./imageResizer");
const probe = require("probe-image-size");
require("dotenv").config();

const callbackQueryHandler = async (response) => {
  try {
    if (!response) return;
    console.log(response);
    const cbId = response?.id;
    const id = response.message.chat.id;
    const callbackData = response?.data;
    const messageText = response.message.text;
    let isBuying = false;

    if (
      callbackData === "gp2k" ||
      callbackData === "gp6k" ||
      callbackData === "gpbt10k"
    ) {
      TFunc.sendMessage({
        chat_id: id,
        text: "Generating payment link...",
      });

      const payment_link = await PaymentFunc.generatePaymentLink(response);

      await TFunc.sendMessage({
        chat_id: id,
        text: `${payment_link}`,
      });

      await axios.post(
        `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
        {
          callback_query_id: cbId,
        }
      );

      isBuying = true;
      return;
    }

    if (!(await UserFunc.userCreditCheck(id)) && !isBuying) {
      if (cbId) {
        await axios.post(
          `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
          {
            callback_query_id: cbId,
          }
        );
      }
      return;
    }

    await TFunc.sendMessage({
      chat_id: id,
      text: "Processing, it may take a while...",
    });

    const bg_color = callbackData || messageText;
    console.log(bg_color);
    const user = await User.findById(id);
    const history = await History.findById(
      user.history[user.history.length - 1]
    );

    console.log("LAST USER HISTORY", user.history[user.history.length - 1]);
    console.log(history);

    let historySaveStatus = true;

    if (history.timestamp !== null) {
      const newHistory = new History({
        background_color: bg_color,
        timestamp: new Date(),
        file_url: history.file_url,
        file_type: history.file_type,
        owner: history.owner,
      });
      await newHistory.save();
      console.log(newHistory);
      user.history.push(newHistory);
      console.log(user);
      historySaveStatus = false;
    } else {
      console.log("CALLBACK BARU");
      history.background_color = bg_color;
      history.timestamp = new Date();
    }

    const file_extension = history.file_url.substring(
      history.file_url.indexOf(".") + 1,
      history.file_url.length
    );

    const path = `${process.cwd()}/photos/${new Date()}.${file_extension}`;
    // const apiKey = await apiKeyGenerator();

    // const api_data = await Apikey.findById(apiKey._id);
    // return;
    const bufferData = await removeBackground(
      `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`,
      bg_color,
      "jCuaRV8CGUi9YtgLFJyEMjv4" //apiKey.key
    );

    // api_data.api_credit--;
    // await api_data.save();

    if (bufferData) {
      const { width, height } = await probe(
        `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`
      );
      console.log(width, height);
      // return;
      await imageResizer(bufferData, path, width, height);
      // fs.writeFileSync(path, bufferData);
      // const data = await sharp(path).resize(2048).toBuffer();
      // // fs.writeFileSync(path, data);
    }

    history.file_type === "document"
      ? await TFunc.sendDocument(id, path)
      : await TFunc.sendPhoto(id, path);

    user.credit--;

    if (historySaveStatus) {
      console.log("SAVE STATUS, CALLBACK BARU");
      await history.save();
    }
    await user.save();

    // fs.unlink(path, (err) => {
    //   if (err) return console.log(err);
    // });

    if (cbId) {
      await axios.post(
        `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
        {
          callback_query_id: cbId,
        }
      );
    }
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = callbackQueryHandler;
