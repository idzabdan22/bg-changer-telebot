const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "RemoveBG_Telegram_Bot",
    });
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  // Set the image to upload
  const imagePath =
    "https://api.telegram.org/file/bot5568457002:AAG8OuUFFkeqhPNubktl2SjaTSwSnzufv4I/documents/file_152.jpg";

  // Upload the image
  const publicId = await uploadImage(imagePath);

  // Get the colors in the image
  // const colors = await getAssetInfo(publicId);

  // Create an image tag, using two of the colors in a transformation
  // const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

  // Log the image tag to the console
  console.log(publicId);
})();
