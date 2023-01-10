// import { User } from "../../model/index.model.js";
import { User } from "../../model/index.model.js";
import { sendMessage } from "../telegram/index.js";

export default async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: "transaction_history",
    });
    // console.log(user.transaction_history[0].order_id);
    // return;
    let historyTemplate = "";
    for (const history of user.transaction_history) {
      historyTemplate += `${history.order_id}\n`;
    }
    console.log(historyTemplate);
    // return;
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
  } catch (error) {}
};
