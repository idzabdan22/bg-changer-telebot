const User = require("../../model/user.model");
const TFunc = require("../telegram")

const userCreditCheck = async (id) => {
  try {
    const isCreditAvailable = await User.findById(id);
    if (!isCreditAvailable.credit > 0) {
      await TFunc.sendMessage({
        chat_id: id,
        text: "Not enough credit, please upgrade to premium!",
      });
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = userCreditCheck;
