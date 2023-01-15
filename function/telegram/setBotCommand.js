import axios from "axios";
const { post } = axios;
import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

export default async () => {
  try {
    const res = await post(
      `https://api.telegram.org/bot${process.env.MAIN_TELE_RBG_BOT_TOKEN}/setMyCommands`,
      {
        commands: [
          {
            command: "start",
            description: "Start the bot",
          },
          {
            command: "info",
            description: "Show the info about you",
          },
          {
            command: "buy_credit",
            description: "Buy credit for changing background",
          },
          {
            command: "about_this_bot",
            description: "Information about this bot",
          },
        ],
      }
    );
    return res;
  } catch (error) {
    throw new CustomError("Telegram Server Error", 500);
  }
};
