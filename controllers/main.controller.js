import {
  callbackQueryHandler,
  processDocOrPhotoData,
  processCommand,
} from "../function/main/index.js";
import { Apikey } from "../model/index.model.js";
import apiChecker from "../function/rbg_api/apiChecker.js";

const index = (req, res) => {
  try {
    res.status(200).send({
      message: "OK, There is nothing to do...",
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const renewApiCredit = async (req, res) => {
  try {
    const api_keys = await Apikey.find({
      api_credit: { $eq: 50 },
    });
    const response = await apiChecker(api_keys);
    res.status(200).send({ message: response });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const handleTelegram = async (req, res) => {
  try {
    const callbackQuery = req.body.callback_query;
    await callbackQueryHandler(callbackQuery);
    const message = req.body?.message;
    if (message) {
      !message?.text
        ? await processDocOrPhotoData(req.body)
        : await processCommand(req.body);
    }
    res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

export { index, handleTelegram, renewApiCredit };
