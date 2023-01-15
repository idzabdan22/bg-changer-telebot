import sharp from "sharp";

export default async (buffer, outputPath, width, height) => {
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
