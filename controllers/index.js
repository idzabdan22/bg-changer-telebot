const sendDocument = require("./sendDocTele");
const sendPhoto = require("./sendPhotoTele");
const removeBackground = require("./removeBackground");
const getTelegramFilePath = require("./getTeleFilePath");
const sendMessage = require("./sendMessageTele");

module.exports = {
  sendDocument,
  sendPhoto,
  sendMessage,
  removeBackground,
  getTelegramFilePath,
};
