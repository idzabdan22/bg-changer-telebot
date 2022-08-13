const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  transaction_time: {
    type: Date,
  },
  transaction_id: {
    type: String,
  },
  gross_amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  transaction_status: {
    type: String,
  },
  order_id_prefix: {
    type: String,
  },
  order_id: {
    type: String,
  },
  payment_status: {
    type: String,
  },
  owner: {
    type: String,
  },
});

module.exports = model("Transaction", transactionSchema);
