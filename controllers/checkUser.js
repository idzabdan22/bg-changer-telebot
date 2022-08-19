const User = require("../model/user");
const registerUser = require("./registerUser");

const checkUser = async (userData) => {
  try {
    const { id } = userData;
    const isRegistered = await User.findById(id);
    if (!isRegistered) await registerUser(userData);
    return;
  } catch (err) {
    throw err;
  }
};

module.exports = checkUser;
