const sendDocument = require("./sendDocTele");
const sendPhoto = require("./sendPhotoTele");
const sendMessage = require("./sendMessageTele");
const getTelegramFilePath = require("./getTeleFilePath");

module.exports = {
  sendDocument,
  sendPhoto,
  sendMessage,
  getTelegramFilePath,
};
