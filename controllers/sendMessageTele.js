const axios = require("axios");
const CustomError = require("../utils/CustomError");
require("dotenv").config();

const sendMessage = async (data) => {
  try {
    const res = await axios.post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/sendMessage`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
    // throw new CustomError("Telegram Server Error", 500);
  }
};

module.exports = sendMessage;
