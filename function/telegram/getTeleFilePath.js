import axios from "axios";
const { get } = axios;
import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
dotenv.config();

export default async (file_id) => {
  try {
    const res = await get(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/getFile?file_id=${file_id}`
    );
    return res.data.result.file_path;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

