const { History, User, Transaction } = require("../model");
const axios = require("axios");
const sendMessage = require("./sendMessageTele");
const userHistory = async (userId) => {
  try {
    const user_history = await User.findById(userId).populate({
      path: "history",
    });
    // let historyTemplate = "";
    // for (const history of userHistory.history) {
    //   historyTemplate += `${history.}`
    // }
    // console.log(user_history.history);

    await sendMessage({
      chat_id: userId,
      text: "Your Trans",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "History",
              callback_data: "/history",
            },
            {
              text: "Transaction History",
              callback_data: "/transactionHistory",
            },
          ],
        ],
      },
    });
  } catch (error) {}
};

module.exports = userHistory;
