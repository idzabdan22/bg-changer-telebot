const axios = require("axios");
const FormData = require("form-data");
const CustomError = require("../utils/CustomError");
require("dotenv").config();

const backroundChangeProcess = async (imgURL, bg_color, apiKey) => {
  try {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", imgURL);
    if (bg_color !== "transparent") formData.append("bg_color", bg_color);
    const res = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": apiKey,
        },
        responseType: "arraybuffer",
        encoding: null,
      }
    );
    return res.data;
  } catch (error) {
    let msg = "";
    switch (error.response.status) {
      case 400:
        msg = "Invalid parameters or input file unprocessable";
        break;
      case 402:
        msg = "Insufficient credits";
        break;
      case 403:
        msg = "Authentication failed";
        break;
      default:
        msg = "Rate limit exceeded";
        break;
    }
    throw new CustomError(msg, error.response.status);
  }
};

// (async () => {
//   // Set the image to upload
//   const imagePath =
//     "https://api.telegram.org/file/bot5568457002:AAG8OuUFFkeqhPNubktl2SjaTSwSnzufv4I/documents/file_152.jpg";

//   // Upload the image
//   const output = await backroundChangeProcess(imagePath, "black", "asdasdsa");

//   // Get the colors in the image
//   // const colors = await getAssetInfo(publicId);

//   // Create an image tag, using two of the colors in a transformation
//   // const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//   // Log the image tag to the console
//   console.log(output);
// })();
