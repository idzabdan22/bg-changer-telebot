const mongoose = require("mongoose");
const User = require("../model/user");
const registerUser = require("./registerUser");

const checkUser = async (userData) => {
  try {
    const { id } = userData;
    const isRegistered = await User.findById(id);
    if (!isRegistered) {
      await registerUser(userData);
    } else return;
    console.log("OKE");
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkUser;
