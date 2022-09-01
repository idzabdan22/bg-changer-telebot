const sharp = require("sharp");

// const imageResizer = async (inputPath, width, height) => {
//   try {
//     const data = await sharp(inputPath)
//       .resize(width, height, {
//         fit: "cover",
//       })
//       .toBuffer();
//     console.log("SUCCESS", data);
//     return data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

const imageResizer = async (buffer, outputPath, width, height) => {
  try {
    await sharp(buffer)
      .resize(width, height, {
        fit: "cover",
      })
      .toFile(outputPath);
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = imageResizer;
