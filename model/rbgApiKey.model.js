import mongoose from "mongoose";
const { Schema, model } = mongoose;

const apiKeySchema = new Schema({
  key: {
    type: String,
  },
  api_credit: {
    type: Number,
  },
});

export default model("Apikey", apiKeySchema);
