const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { User, Transaction } = require("../../model/index.model");
const {
  getProductionHeader,
} = require("../../config/midtransHeaderConfig.config");
const generateOrderId = require("../../utils/generateOrderId.util");

const axiosConfig = {
  headers: getProductionHeader(),
};

const generatePaymentLink = async (responseData) => {
  try {
    const userId = responseData.from.id;
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
    const userOrderId = generateOrderId(userId);
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
          name: `pack of ${credit} Credit`,
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
      owner: responseData.message.chat.id,
      payment_status: "",
      order_id: userOrderId,
      credit_amount: credit,
    });

    const user = await User.findById(responseData.message.chat.id);
    user.transaction_history.push(transaction);
    await transaction.save();
    await user.save();

    return res.data.payment_url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = generatePaymentLink