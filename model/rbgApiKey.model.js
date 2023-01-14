import mongoose from "mongoose";
const { Schema, model } = mongoose;

const apiKeySchema = new Schema({
  key: {
    type: String,
  },
  api_credit: {
    type: Number,
  },
  created_at: {
    type: Date,
  },
  pusher: {
    type: String,
  },
  renewed_at: {
    type: Date,
  },
});

apiKeySchema.index({ key: 1 }, { unique: true });
export default model("Apikey", apiKeySchema);
