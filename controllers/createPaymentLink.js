const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const {
  getSandBoxHeader,
  getProductionHeader,
} = require("../config/midtransHeaderConfig");
const generateOrderId = require("../utils/generateOrderId");

const axiosConfig = {
  headers: getProductionHeader(),
};

const generatePaymentLink = async (data) => {
  try {
    const data = {
      transaction_details: {
        order_id: `${order_id}`,
        gross_amount: 2000.0,
        payment_link_id: `${order_id}`,
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
      enabled_payments: ["gopay", "bri_va"],
      item_details: [
        {
          name: "Credits",
          price: 2000.00,
          quantity: 1,
          merchant_name: "Your BG Changer",
        },
      ],
      customer_details: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@midtrans.com",
        phone: "+62181000000000",
        notes:
          "Thank you for your purchase. Please follow the instructions to pay.",
      },
      custom_field1: "custom field 1 content",
      custom_field2: "custom field 2 content",
      custom_field3: "custom field 3 content",
    };
    console.log(data);
    const res = await axios.post(
      "https://api.midtrans.com/v1/payment-links",
      data,
      axiosConfig
    );
    console.log(res);
  } catch (error) {
    // console.log(error);
  }
};

generatePaymentLink();
