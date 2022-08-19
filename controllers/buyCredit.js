const sendMessage = require("./sendMessageTele");

const buyCredit = async (userId) => {
  try {
    await sendMessage({
      chat_id: userId,
      text: "Please read our payment's rules:",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Buy 5 Credit",
              callback_data: "gp2k",
            },
            {
              text: "Buy 17 Credit",
              callback_data: "gp6k",
            },
          ],
          [
            {
              text: "Buy 28 Credit",
              callback_data: "gpbt10k",
            },
          ],
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = buyCredit;
