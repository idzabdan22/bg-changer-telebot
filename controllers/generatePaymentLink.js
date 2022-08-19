const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const {
  getSandBoxHeader,
  getProductionHeader,
} = require("../config/midtransHeaderConfig");
const generateOrderId = require("../utils/generateOrderId");
const sendMessage = require("./sendMessageTele");

const axiosConfig = {
  headers: getProductionHeader(),
};

const generatePaymentLink = async (resData) => {
  try {
    console.log("MASUKKKK");
    let amount = 0;
    let payment_method = [];
    let credit = 0;
    if (resData === "gp2k") {
      amount = 2000.0;
      credit = 5;
      payment_method.push("gopay");
    } else if (resData === "gp6k") {
      amount = 6000.0;
      credit = 17;
      payment_method.push("gopay");
    } else {
      credit = 28;
      amount = 10000.0;
    }
    const data = {
      transaction_details: {
        order_id: `${uuidv4()}`,
        gross_amount: amount,
        payment_link_id: `${uuidv4()}`,
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
      enabled_payments: payment_method,
      item_details: [
        {
          name: `: ${credit} Credit`,
          price: amount,
          quantity: 1,
          merchant_name: "Your BG Changer",
        },
      ],
      custom_field1: "custom field 1 content",
      custom_field2: "custom field 2 content",
      custom_field3: "custom field 3 content",
    };

    const res = await axios.post(
      "https://api.midtrans.com/v1/payment-links",
      data,
      axiosConfig
    );
    console.log(res.data);
    return res.data.payment_url;
  } catch (error) {
    console.log(error);
    throw error;
    // console.log(error);
  }
};

module.exports = generatePaymentLink;

// generatePaymentLink();
