import { History, User } from "../../model/index.model.js";
import { sendMessage, getTelegramFilePath } from "../telegram/index.js";

const processDocOrPhotoData = async (data) => {
  try {
    const id = data.message.chat.id;
    const validType = ["image/jpeg", "image/png", "image/jpg"];
    if (
      !(
        "photo" in data.message ||
        ("document" in data.message &&
          validType.includes(data.message.document.mime_type))
      )
    ) {
      await sendMessage({
        chat_id: id,
        text: "Oops, that is not i expected...",
      });

      await sendMessage({
        chat_id: id,
        text: "Try again, sending file within these format: JPEG, PNG, JPG.",
      });

    } else {
      const photoArr = data.message.photo;
      const file_id = !photoArr
        ? data.message.document.file_id
        : data.message.photo[photoArr.length - 1].file_id;
      const file_url = await getTelegramFilePath(file_id);
      const file_type = !photoArr ? "document" : "photo";

      const userHistory = new History({
        owner: id,
        timestamp: "",
        background_color: "",
        file_type: file_type,
        file_url: file_url,
      });

      await userHistory.save();

      const user = await User.findById(id);

      user.history.push(userHistory);

      await user.save();

      await sendMessage({
        chat_id: id,
        text: "Choose our favorite backround color below:",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Red",
                callback_data: "red",
              },
              {
                text: "Blue",
                callback_data: "blue",
              },
              {
                text: "Green",
                callback_data: "green",
              },
            ],
            [
              {
                text: "White",
                callback_data: "white",
              },
              {
                text: "Black",
                callback_data: "black",
              },
              {
                text: "Transparent",
                callback_data: "transparent",
              },
            ],
          ],
        },
      });

      await sendMessage({
        chat_id: id,
        text: "Or type the hex color code (ex: 81d4fa, fff).",
      });
      
    }
  } catch (error) {
    console.log(error);
  }
};

export default processDocOrPhotoData;
