import User from "../../model/user.model.js";
import registerUser from "./registerUser.js";

const checkUser = async (userData) => {
  try {
    const { id } = userData;
    const isRegistered = await User.findById(id);
    if (!isRegistered) await registerUser(userData);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default checkUser;
