const callbackQueryHandler = require("./callbackQueryHandler");
const PaymentFunc = require("../payment");
const UserFunc = require("../user");
const TFunc = require("../telegram");

const processCommand = async (chatData) => {
  try {
    const message = chatData.message.text;
    const id = chatData.message.from.id;
    console.log(chatData);
    if (message.match(new RegExp("/[a-zA-Z]+"))) {
      switch (message) {
        case "/start":
          await UserFunc.checkUser(chatData.message.from);
          await TFunc.sendMessage({
            chat_id: id,
            text: "Hello, greeting from bot!\nJust send an image, and i will change your background image!\nChanging backround is so easy with this bot!\nLet's get rock!",
          });
          await TFunc.sendMessage({
            chat_id: id,
            text: "Send me an image with 10 MB of maximum file size",
          });
          break;
        case "/info":
          await UserFunc.userInfo(id);
          break;
        case "/history":
          // await userHistory(id);
          break;
        case "/buyCredit":
          await PaymentFunc.buyCredit(id);
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

module.exports = processCommand;
