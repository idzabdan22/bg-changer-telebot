import FormData from "form-data";
import axios from "axios";
const { post } = axios;
import { basename } from "path";
import { createReadStream } from "fs";
import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
dotenv.config();

const sendDocument = async (chat_id, local_file_path) => {
  try {
    const teleForm = new FormData();
    teleForm.append("chat_id", chat_id);
    teleForm.append(
      "document",
      createReadStream(local_file_path),
      basename(local_file_path)
    );
    const res = await post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendDocument`,
      teleForm
    );
    return res.status;
  } catch (error) {
    // console.log(error);
    throw new CustomError("Telegram Server Error", 500);
  }
};

export default sendDocument;
