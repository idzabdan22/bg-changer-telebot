import callbackQueryHandler from "./callbackQueryHandler.js";
import { buyCredit } from "../payment/index.js";
import { checkUser, userInfo } from "../user/index.js";
import { sendMessage, setBotCommand } from "../telegram/index.js";

export default async (chatData) => {
  try {
    console.log(chatData);
    const message = chatData.message.text;
    const id = chatData.message.from.id;
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
          await setBotCommand();
          break;
        case "/info":
          await userInfo(id);
          break;
        case "/history":
          // await userHistory(id);
          break;
        case "/buy_credit":
          await buyCredit(id);
          break;
        case "/transaction_status":
          break;
        case "/about_this_bot":
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
    throw error;
  }
};
