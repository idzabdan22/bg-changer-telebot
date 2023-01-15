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
import imageDownloader from "../../utils/imageDownloader.js";
import probe from "probe-image-size";
import dotenv from "dotenv";
dotenv.config();
import sharp from "sharp";

export default async (cbId, id, callbackData, messageText) => {
  console.log(cbId);
  if (!(await userCreditCheck(id))) {
    // && !isBuying
    console.log("test");
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

  let path = "";

  if (bg_color === "transparent") {
    path = `${process.cwd()}/photos/${id}.png`;
  } else {
    path = `${process.cwd()}/photos/${id}.${file_extension}`;
  }

  await imageDownloader(
    `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`,
    path
  );

  const apiKey = await apiKeyGenerator();
  // const api_data = await Apikey.findById(apiKey._id);

  const bufferData = await removeBackground(
    path,
    bg_color,
    "FdSZyfLmRduhYyDyfvH1Xau2"
  );

  // api_data.api_credit--;

  // await api_data.save();

  if (bufferData) {
    const { width, height } = await probe(
      `https://api.telegram.org/file/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/${history.file_url}`
    );
    await imageResizer(bufferData, path, width, height);
    // fs.writeFileSync(path, bufferData);
    // const data = await sharp(path).resize(width*height).toBuffer();
    // fs.writeFileSync(path, data);
  }

  history.file_type === "document"
    ? await sendDocument(id, path)
    : await sendPhoto(id, path);

  user.credit--;

  if (historySaveStatus) {
    await history.save();
  }
  await user.save();

  if (cbId) {
    // await post(
    //   `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/editMessageReplyMarkup`,
    //   {
    //     message_id: message_id,
    //   }
    // );
    try {
      await post(
        `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
        {
          callback_query_id: cbId,
          cache_time: 0,
        }
      );
    } catch (error) {
      console.log("Error di callback query");
    }

    // fs.unlink(path, (err) => {
    //   if (err) return console.log(err);
    // });
  }
  return;
};
