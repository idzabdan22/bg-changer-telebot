const sendDocument = require("./sendDocTele");
const sendPhoto = require("./sendPhotoTele");
const removeBackground = require("./removeBackground");
const getTelegramFilePath = require("./getTeleFilePath");
const sendMessage = require("./sendMessageTele");
const callbackQueryHandler = require("./callbackQueryHandler");
const checkUser = require("./checkUser");
const registerUser = require("./registerUser");
const apiKeyGenerator = require("./apikeyChanger");
const processCommand = require("./processCommand");
const processDocOrPhotoData = require("./processDocOrPhotoData");
const paymentHandling = require("./paymentHandling");

module.exports = {
  sendDocument,
  sendPhoto,
  sendMessage,
  removeBackground,
  getTelegramFilePath,
  callbackQueryHandler,
  checkUser,
  registerUser,
  apiKeyGenerator,
  processCommand,
  processDocOrPhotoData,
  paymentHandling,
};
