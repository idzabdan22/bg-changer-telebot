import fs from "fs";
import axios from "axios";
const { post } = axios;
import { User, History, Apikey } from "../../model/index.model.js";
import { sendMessage, sendDocument, sendPhoto } from "../telegram/index.js";
import apiKeyGenerator from "../main/apiKeyGenerator.js";
import removeBackground from "../main/removeBackground.js";
import Path from "path";
import { generatePaymentLink } from "../payment/index.js";
import { userCreditCheck } from "../user/index.js";
import imageResizer from "../main/imageResizer.js";
import probe from "probe-image-size";
import dotenv from "dotenv";
dotenv.config();

export default async (cbId, id, callbackData, messageText) => {
  if (!(await userCreditCheck(id))) {
    // && !isBuying

    if (cbId) {
      await post(
        `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
        {
          callback_query_id: cbId,
        }
      );
    }
    return;
  }
  await sendMessage({
    chat_id: id,
    text: "Processing, it may take a while...",
  });
  const bg_color = callbackData || messageText;
  const user = await User.findById(id);
  const history = await History.findById(user.history[user.history.length - 1]);

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

    user.history.push(newHistory);

    historySaveStatus = false;
  } else {
    history.background_color = bg_color;
    history.timestamp = new Date();
  }

  const file_extension = history.file_url.substring(
    history.file_url.indexOf(".") + 1,
    history.file_url.length
  );

  const path = `${process.cwd()}/photos/${new Date()}.${file_extension}`;

  const apiKey = await apiKeyGenerator();
  const api_data = await Apikey.findById(apiKey._id);

  console.log(api_data);

  const bufferData = await removeBackground(
    `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`,
    bg_color,
    api_data.key
  );

  api_data.api_credit--;

  await api_data.save();

  if (bufferData) {
    const { width, height } = await probe(
      `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`
    );
    await imageResizer(bufferData, path, width, height);
    //   console.log(status);
    //   // fs.writeFileSync(path, bufferData);
    //   // const data = await sharp(path).resize(2048).toBuffer();
    //   // // fs.writeFileSync(path, data);
  }

  history.file_type === "document"
    ? await sendDocument(id, path)
    : await sendPhoto(id, path);

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
    await post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
      {
        callback_query_id: cbId,
      }
    );
  }
  return;
};
