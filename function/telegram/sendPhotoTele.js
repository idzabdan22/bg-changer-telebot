import FormData from "form-data";
import axios from "axios";
const { post } = axios;
import { basename } from "path";
import { createReadStream } from "fs";
import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
dotenv.config();

const sendPhoto = async (chat_id, local_file_path) => {
  try {
    const teleForm = new FormData();
    teleForm.append("chat_id", chat_id);
    teleForm.append(
      "photo",
      createReadStream(local_file_path),
      basename(local_file_path)
    );
    const res = await post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendPhoto`,
      teleForm
    );
    return res.status;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

export default sendPhoto;

//   .then((response) => {
// fs.unlink(path, (err) => {
//   if (err) return console.log(err);
// });
//   })
//   .catch((error) => {
//     sendMessage(chat_id, "Oops, seems like server error...", null);
//   });
