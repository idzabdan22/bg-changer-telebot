const removeBackground = require("./removeBackground");
const callbackQueryHandler = require("./callbackQueryHandler");
const apiKeyGenerator = require("./apiKeyGenerator");
const processCommand = require("./processCommand");
const processDocOrPhotoData = require("./processDocOrPhotoData");
const imageResizer = require("./imageResizer");

module.exports = {
  removeBackground,
  callbackQueryHandler,
  apiKeyGenerator,
  processCommand,
  processDocOrPhotoData,
  imageResizer,
};
