import User from "../../model/user.model.js";
import { sendMessage } from "../telegram/index.js";

export default async (id) => {
  try {
    const isCreditAvailable = await User.findById(id);
    if (!isCreditAvailable.credit > 0) {
      await sendMessage({
        chat_id: id,
        text: "Not enough credit, please upgrade to premium!",
      });
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw err;
  }
};

