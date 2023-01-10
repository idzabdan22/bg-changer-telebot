import {
  callbackQueryHandler,
  processDocOrPhotoData,
  processCommand,
} from "../function/main/index.js";

const index = (req, res) => {
  try {
    res.status(200).send({
      message: "OK, There is nothing to do...",
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const handleTelegram = async (req, res) => {
  try {
    const callbackQuery = req.body.callback_query;
    console.log(callbackQuery);
    await callbackQueryHandler(callbackQuery);
    const message = req.body?.message;
    // console.log("MESSAGE, ", message);
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

export {
  index,
  handleTelegram,
};
