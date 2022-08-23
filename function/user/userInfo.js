const { User } = require("../../model");
const { sendMessage } = require("../telegram");

const userInfo = async (userId) => {
  try {
    const user = await User.findById(userId);
    const userInfoTemplate = `Here your's user info:\nuser_id: ${user._id}\nusername: ${user.username}\ncredit: ${user.credit}\nfirst_name: ${user.first_name}\nlast_name: ${user.last_name}\nlanguage: ${user.language_code}
    `;
    await sendMessage({
      chat_id: userId,
      text: userInfoTemplate,
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

module.exports = userInfo;