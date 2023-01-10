import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
  },
  credit: {
    type: Number,
  },
  is_bot: {
    type: Boolean,
  },
  language_code: {
    type: String,
  },
  history: [{ type: Schema.Types.ObjectId, ref: "History" }],
  transaction_history: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

export default model("User", userSchema);
