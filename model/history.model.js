const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const historySchema = new Schema({
  owner: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  file_url: {
    type: String,
  },
  background_color: {
    type: String,
  },
  file_type: {
    type: String,
  },
  pxl_width_size: {
    type: Number,
  },
});

module.exports = model("History", historySchema);
