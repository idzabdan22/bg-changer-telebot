import checkUser from "./checkUser.js";
import { User } from "../../model/index.model.js";

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

    return await user.save();
  } catch (error) {
    throw err;
  }
};
export default registerUser;
