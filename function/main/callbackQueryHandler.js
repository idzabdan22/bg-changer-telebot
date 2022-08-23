const axios = require("axios");
const fs = require("fs");
const { User, History, Apikey } = require("../../model/index.model");
const { sendDocument, sendMessage, sendPhoto } = require("../telegram");
const Path = require("path");
const { generatePaymentLink } = require("../payment");
const { userCreditCheck } = require("../user");
const removeBackground = require("./removeBackground");
const apiKeyGenerator = require("./apikeyChanger");
const sharp = require("sharp");
require("dotenv").config();

const callbackQueryHandler = async (response) => {
  try {
    if (!response) return;

    const cbId = response?.id;
    const id = response.message.chat.id;
    let isBuying = false;

    if (
      response.data === "gp2k" ||
      response.data === "gp6k" ||
      response.data === "gpbt10k"
    ) {
      sendMessage({
        chat_id: id,
        text: "Generating payment link...",
      });

      const payment_link = await generatePaymentLink(response);

      await sendMessage({
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

    if (!(await userCreditCheck(id)) && !isBuying) {
      if (cbId) {
        await axios.post(
          `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
          {
            callback_query_id: cbId,
          }
        );
      }
      return;
    } else {
      if (cbId)
        await axios.post(
          `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
          {
            callback_query_id: cbId,
          }
        );
    }

    await sendMessage({
      chat_id: id,
      text: "Processing, it may take a while...",
    });

    console.log(response.data, response.message.text);
    const bg_color = response.data || response.message.text;
    console.log(bg_color);
    const user = await User.findById(id);
    const history = await History.findById(
      user.history[user.history.length - 1]
    );
    history.background_color = bg_color;
    history.timestamp = new Date(response.message.date * 1000);

    const file_extension = history.file_url.substring(
      history.file_url.indexOf(".") + 1,
      history.file_url.length
    );

    const path = `${process.cwd()}/photos/${id}.${file_extension}`;
    const apiKey = await apiKeyGenerator();

    const api_data = await Apikey.findById(apiKey._id);

    const bufferData = await removeBackground(
      `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`,
      bg_color,
      apiKey.key
    );

    api_data.api_credit--;
    await api_data.save();

    fs.writeFileSync(path, bufferData);

    const data = await sharp(path).resize(2048).toBuffer();

    fs.writeFileSync(path, data);

    history.file_type === "document"
      ? await sendDocument(id, path)
      : await sendPhoto(id, path);
    user.credit--;
    await user.save();

    fs.unlink(path, (err) => {
      if (err) return console.log(err);
    });

    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = callbackQueryHandler;
