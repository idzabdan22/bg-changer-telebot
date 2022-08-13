const axios = require("axios");
const CustomError = require("../utils/CustomError");
require("dotenv").config();

const getFilePath = async (file_id) => {
  try {
    const res = await axios.get(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/getFile?file_id=${file_id}`
    );
    return res.data.result.file_path;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

module.exports = getFilePath;
