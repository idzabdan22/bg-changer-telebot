const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const apiKeySchema = new Schema({
  key: {
    type: String,
  },
  api_credit: {
    type: Number,
  },
});

module.exports = model("Apikey", apiKeySchema);
