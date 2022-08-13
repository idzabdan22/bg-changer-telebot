const mongoose = require("mongoose");
const User = require("../model/user");
const registerUser = require("./registerUser");
const sendMessage = require("./sendMessageTele");

const userCreditCheck = async (id) => {
  try {
    const isCreditAvailable = await User.findById(id);
    if (!isCreditAvailable.credit) {
      await sendMessage({
        chat_id: id,
        text: "Not enough credit, please upgrade to premium!",
      });
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = userCreditCheck;
