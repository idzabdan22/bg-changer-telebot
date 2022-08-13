const checkUser = require("./checkUser");
const { User } = require("../model");

const registerUser = async (userData) => {
  try {
    const {
      id,
      first_name = `fname${id}`,
      last_name = `lname${id}`,
      username = `user_${id}`,
      is_bot,
      language_code = "en",
    } = userData;

    const user = new User({
      _id: id,
      first_name: first_name,
      last_name: last_name,
      username: username,
      credit: 5,
      is_bot: is_bot,
      language_code: language_code,
    });

    await user.save();
    return 200;
  } catch (error) {
    next();
  }
};

module.exports = registerUser;
