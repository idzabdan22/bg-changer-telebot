import sendDocument from "./sendDocTele";
import sendPhoto from "./sendPhotoTele";
import removeBackground from "./removeBackground";
import getTelegramFilePath from "./getTeleFilePath";
import sendMessage from "./sendMessageTele";
import callbackQueryHandler from "./callbackQueryHandler";
import checkUser from "./checkUser";
import registerUser from "./registerUser";
import apiKeyGenerator from "./apikeyChanger";
import processCommand from "./processCommand";
import processDocOrPhotoData from "./processDocOrPhotoData";
import paymentHandling from "./paymentHandling";

export default {
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
