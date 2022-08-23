const removeBackground = require("./removeBackground");
const callbackQueryHandler = require("./callbackQueryHandler");
const apiKeyGenerator = require("./apikeyChanger");
const processCommand = require("./processCommand");
const processDocOrPhotoData = require("./processDocOrPhotoData");

module.exports = {
  removeBackground,
  callbackQueryHandler,
  apiKeyGenerator,
  processCommand,
  processDocOrPhotoData,
};
