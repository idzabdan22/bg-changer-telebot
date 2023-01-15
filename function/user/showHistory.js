import { User } from "../../model/index.model.js";
import { sendMessage } from "../telegram/index.js";

export default async (userId) => {
  try {
    const user_history = await User.findById(userId).populate({
      path: "history",
    });
    let historyTemplate = "";
    for (const history of user_history.history) {
      historyTemplate += `${history._id}\n`;
    }
    await sendMessage({
      chat_id: userId,
      text: `${historyTemplate}`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Transaction History",
              callback_data: "/tHistory",
            },
          ],
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};
