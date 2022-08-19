const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { User, Transaction } = require("../model");
const {
  getSandBoxHeader,
  getProductionHeader,
} = require("../config/midtransHeaderConfig");
const generateOrderId = require("../utils/generateOrderId");
const sendMessage = require("./sendMessageTele");

const axiosConfig = {
  headers: getProductionHeader(),
};

const generatePaymentLink = async (responseData) => {
  try {
    let amount = 0;
    let payment_method = [];
    let credit = 0;
    if (responseData.data === "gp2k") {
      amount = 2000.0;
      credit = 5;
      payment_method.push("gopay");
    } else if (responseData.data === "gp6k") {
      amount = 6000.0;
      credit = 17;
      payment_method.push("gopay");
    } else {
      credit = 28;
      amount = 10000.0;
    }
    const userOrderId = uuidv4();
    const data = {
      transaction_details: {
        order_id: userOrderId,
        gross_amount: amount,
        payment_link_id: userOrderId,
      },
      credit_card: {
        secure: true,
      },
      usage_limit: 1,
      expiry: {
        start_time: `${new Date().toISOString()}`,
        duration: 30,
        unit: "minutes",
      },
      item_details: [
        {
          name: `: ${credit} Credit`,
          price: amount,
          quantity: 1,
          merchant_name: "Your BG Changer",
        },
      ],
      custom_field1: "custom field 1 content",
    };

    if (payment_method.length) data.enabled_payments = payment_method;

    const res = await axios.post(
      "https://api.midtrans.com/v1/payment-links",
      data,
      axiosConfig
    );

    const transaction = new Transaction({
      transaction_id: "",
      transaction_time: "",
      transaction_status: "",
      gross_amount: amount,
      currency: "IDR",
      order_id_prefix: userOrderId,
      owner: responseData.message.chat.id,
      payment_status: "",
      order_id: "",
    });

    const user = await User.findById(responseData.message.chat.id);
    user.transaction_history = transaction;
    await user.save();
    await transaction.save();

    return res.data.payment_url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = generatePaymentLink;

// generatePaymentLink();
