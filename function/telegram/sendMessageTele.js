const axios = require("axios");
const CustomError = require("../../utils/CustomError.util");
require("dotenv").config();

const sendMessage = async (data) => {
  try {
    const res = await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendMessage`,
      data
    );
    return res;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};

module.exports = sendMessage