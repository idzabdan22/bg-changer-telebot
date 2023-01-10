import { User } from "../../model/index.model.js";
import * as TFunc from "../telegram/index.js";

const userInfo = async (userId) => {
  try {
    const user = await User.findById(userId);
    const userInfoTemplate = `Here your's user info:\nuser_id: ${user._id}\nusername: ${user.username}\ncredit: ${user.credit}\nfirst_name: ${user.first_name}\nlast_name: ${user.last_name}\nlanguage: ${user.language_code}
    `;
    await TFunc.sendMessage({
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
              callback_data: "/tHistory",
            },
          ],
        ],
      },
    });
  } catch (error) {}
};

export default userInfo;
