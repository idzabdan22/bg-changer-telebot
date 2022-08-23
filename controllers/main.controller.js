const MainFunc = require("../function/main");

const index = (req, res) => {
  try {
    console.log("REQUEST GET MASUK");
    res.status(200).send({
      message: "OK, There is nothing to do...",
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const handleTelegram = async (req, res) => {
  try {
    console.log("MASUK");
    const callbackQuery = req.body.callback_query;
    await MainFunc.callbackQueryHandler(callbackQuery);
    const message = req.body?.message;
    if (message) {
      !message?.text
        ? await MainFunc.processDocOrPhotoData(req.body)
        : await MainFunc.processCommand(req.body);
    }
    console.log("MASUK 2");

    res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

module.exports = {
  index,
  handleTelegram,
};
