import axios from "axios";
const { post } = axios;import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
dotenv.config();

const sendMessage = async (data) => {
  try {
    const res = await post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendMessage`,
      data
    );
    return res;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

export default sendMessage;
