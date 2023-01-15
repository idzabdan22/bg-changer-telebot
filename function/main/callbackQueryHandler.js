import dotenv from "dotenv";
dotenv.config();
import paymentHelper from "../callback_helper/paymentHelper.js";
import changingBackgroundHelper from "../callback_helper/changingBackgroundHelper.js";
import showTransactionHistory from "../user/showTransactionHistory.js";
import showHistory from "../user/showHistory.js";

export default async (response) => {
  try {
    if (!response) return;
    const cbId = response?.id;
    const id = response.message.chat.id;
    const callbackData = response?.data;
    const messageText = response.message.text;
    const messageId = response.message.message_id;
    let isBuying = false;

    console.log(response);

    if (
      callbackData === "gp2k" ||
      callbackData === "gp6k" ||
      callbackData === "gpbt10k"
    ) {
      paymentHelper(id, cbId, response);
    } else if (callbackData === "/history") {
      await showHistory(id);
    } else if (callbackData === "/tHistory") {
      await showTransactionHistory(id);
    } else {
      console.log(callbackData);
      await changingBackgroundHelper(cbId, id, callbackData, messageText);
    }
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

