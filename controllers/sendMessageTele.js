const axios = require("axios");
const CustomError = require("../utils/CustomError");
require("dotenv").config();

const sendMessage = async (data) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendMessage`,
      data
    );
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

// async function sendMessage(chat_id, replyText, keyboardData) {
//   try {
//     const data = !keyboardData
//       ? {
//           chat_id: chat_id,
//           text: replyText,
//         }
//       : {
//           chat_id: chat_id,
//           text: replyText,
//           reply_markup: keyboardData,
//         };

// }
