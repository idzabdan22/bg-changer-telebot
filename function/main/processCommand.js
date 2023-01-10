import callbackQueryHandler from "./callbackQueryHandler.js";
import { buyCredit } from "../payment/index.js";
import { checkUser, userInfo } from "../user/index.js";
import { sendMessage } from "../telegram/index.js";

const processCommand = async (chatData) => {
  try {
    const message = chatData.message.text;
    const id = chatData.message.from.id;
    // console.log(chatData);
    if (message.match(new RegExp("/[a-zA-Z]+"))) {
      switch (message) {
        case "/start":
          await checkUser(chatData.message.from);
          await sendMessage({
            chat_id: id,
            text: "Hello, greeting from bot!\nJust send an image, and i will change your background image!\nChanging backround is so easy with this bot!\nLet's get rock!",
          });
          await sendMessage({
            chat_id: id,
            text: "Send me an image with 10 MB of maximum file size",
          });
          break;
        case "/info":
          await userInfo(id);
          break;
        case "/history":
          // await userHistory(id);
          break;
        case "/buyCredit":
          await buyCredit(id);
          break;
        case "/transactionStatus":
          break;
        case "/aboutThisBot":
          break;
        default:
          break;
      }
    } else {
      if (message.match(/[a-fA-F0-9]+((?![\w,]))/g)) {
        await callbackQueryHandler(chatData);
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default processCommand;
