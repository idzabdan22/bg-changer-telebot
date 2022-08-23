const FormData = require("form-data");
const axios = require("axios");
const nodePath = require("path");
const fs = require("fs");
const CustomError = require("../../utils/CustomError.util");
require("dotenv").config();

const sendPhoto = async (chat_id, local_file_path) => {
  try {
    const teleForm = new FormData();
    teleForm.append("chat_id", chat_id);
    teleForm.append(
      "photo",
      fs.createReadStream(local_file_path),
      nodePath.basename(local_file_path)
    );
    const res = await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendPhoto`,
      teleForm
    );
    return res.status;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

module.exports = sendPhoto;

//   .then((response) => {
// fs.unlink(path, (err) => {
//   if (err) return console.log(err);
// });
//   })
//   .catch((error) => {
//     sendMessage(chat_id, "Oops, seems like server error...", null);
//   });
