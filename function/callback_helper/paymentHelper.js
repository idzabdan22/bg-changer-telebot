import axios from "axios";
const { post } = axios;
import { sendMessage } from "../telegram/index.js";
import { generatePaymentLink } from "../payment/index.js";
import dotenv from "dotenv";
dotenv.config();

export default async (id, cbId, response) => {
  await sendMessage({
    chat_id: id,
    text: "Generating payment link...",
  });

  const payment_link = await generatePaymentLink(response);

  await sendMessage({
    chat_id: id,
    text: `${payment_link}`,
  });

  await post(
    `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/answerCallbackQuery`,
    {
      callback_query_id: cbId,
    }
  );

  // isBuying = true;
//   return;
};
