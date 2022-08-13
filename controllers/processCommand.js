const axios = require("axios");
const sendMessage = require("./sendMessageTele");
const checkUser = require("./checkUser");

const processCommand = async (chatData) => {
  try {
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
          break;
        case "/info":
          break;
        case "/buyCredit":
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
        await sendMessage({
          chat_id: chatData.message.chat.id,
          text: "Processing, it may take a while...",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = processCommand;
