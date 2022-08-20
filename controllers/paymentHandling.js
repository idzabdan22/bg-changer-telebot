const { Transaction } = require("../model");

const paymentHandling = async (responseData) => {
  try {
    console.log(responseData);
    console.log(responseData.order_id);
    const rawOrderId = responseData.order_id;
    const orderId = rawOrderId.slice(0, rawOrderId.lastIndexOf("-"));
    console.log(orderId);
    const transaction = await Transaction.find({
      order_id: orderId,
    });
    console.log(transaction);
    return;
  } catch (error) {}
};

module.exports = paymentHandling;
