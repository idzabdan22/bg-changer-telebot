import User from "../../model/user.model.js";
import registerUser from "./registerUser.js";
import { sendMessage } from "../telegram/index.js";

export default async (userData) => {
  try {
    const { id } = userData;
    const isRegistered = await User.findById(id);
    if (!isRegistered) {
      await sendMessage({
        chat_id: id,
        text: "Registering user, please wait...",
      });
      await registerUser(userData);
    }
    return true;
  } catch (err) {
    throw err;
  }
};
