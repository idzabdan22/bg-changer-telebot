import axios from "axios";
import FormData from "form-data";
import CustomError from "../../utils/CustomError.util.js";
import dotenv from "dotenv";
dotenv.config();
const { post } = axios;

const backroundChangeProcess = async (imgURL, bg_color, apiKey) => {
  try {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", imgURL);
    if (!(bg_color === "transparent")) {
      formData.append("bg_color", bg_color);
    }

    const res = await post("https://api.remove.bg/v1.0/removebg", formData, {
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": apiKey,
      },
      responseType: "arraybuffer",
      encoding: null,
    });
    return res.data;
  } catch (error) {
    console.log("ERROR DI REMOVE BACKGROUND");
    // let msg = "";
    // switch (error.response.) {
    //   case 400:
    //     msg = "Invalid parameters or input file unprocessable";
    //     break;
    //   case 402:
    //     msg = "Insufficient credits";
    //     break;
    //   case 403:
    //     msg = "Authentication failed";
    //     break;
    //   default:
    //     msg = "Rate limit exceeded";
    //     break;
    // }
    // throw new CustomError(msg, error.response.status);
    return false;
  }
};

export default backroundChangeProcess;
