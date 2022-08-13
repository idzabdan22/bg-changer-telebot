const removeBackground = require("./removeBackground");
const sendMessage = require("./sendMessageTele");
const axios = require("axios");
const fs = require("fs");
const { User, Data, History, Apikey } = require("../model");
const Path = require("path");
const sendDocument = require("./sendDocTele");
const sendPhoto = require("./sendPhotoTele");
const apiKeyGenerator = require("./apikeyChanger");
const userCreditCheck = require("./userCreditCheck");

require("dotenv").config();

const callbackQueryHandler = async (response) => {
  try {
    if (!response) {
      return;
    }
    console.log(response);
    const cbId = response.id;
    const id = response.message.chat.id;

    if (!(await userCreditCheck(id))) {
      await axios.post(
        `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
        {
          callback_query_id: cbId,
          cache_time: 0,
        }
      );
      return 200;
    }
    await sendMessage({
      chat_id: id,
      text: "Processing, it may take a while...",
    });
    const bg_color = response.data;
    const user = await User.findById(id);
    const history = await History.findByIdAndUpdate(
      user.history[user.history.length - 1]
    );
    history.background_color = bg_color;
    history.timestamp = new Date(response.message.date * 1000);
    await history.save();

    const file_extension = history.file_url.substring(
      history.file_url.indexOf(".") + 1,
      history.file_url.length
    );
    const path = `${process.cwd()}/photos/${id}.${file_extension}`;
    const apiKey = await apiKeyGenerator();

    const api_data = await Apikey.findById(apiKey._id);
    api_data.api_credit--;
    await api_data.save();

    const bufferData = await removeBackground(
      `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`,
      bg_color,
      apiKey.key
    );

    fs.writeFileSync(path, bufferData);

    history.file_type === "document"
      ? await sendDocument(id, path)
      : await sendPhoto(id, path);

    await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
      {
        callback_query_id: cbId,
        text: "Finish Processing!",
      }
    );

    user.credit--;
    await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports = callbackQueryHandler;
