import { User } from "../../model/index.model.js";
import { sendMessage } from "../telegram/index.js";

export default async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: "transaction_history",
    });
    let historyTemplate = "";
    for (const history of user.transaction_history) {
      historyTemplate += `${history.order_id}\n`;
    }
    await sendMessage({
      chat_id: userId,
      text: `${historyTemplate}`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "History",
              callback_data: "/history",
            },
          ],
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};
