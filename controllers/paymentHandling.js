const { Transaction } = require("../model");

const paymentHandling = async (responseData) => {
  try {
    console.log(responseData);
    console.log(responseData.order_id);
    const rawOrderId = responseData.order_id;
    const orderId = rawOrderId.slice(0, rawOrderId.lastIndexOf("-"));
    console.log(orderId);
    const transaction = await Transaction.findOne({
      order_id: orderId,
    });
    transaction.transaction_time = responseData.transaction_time;
    transaction.transaction_id = responseData.transaction_id;
    transaction.currency = responseData.currency;

    const transactionStatus = responseData.transaction_status;
    const fraudStatus = responseData.fraud_status;
    transaction.transaction_status = transactionStatus;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );

    // Sample transactionStatus handling logic

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        transaction.payment_status = "challenge";
        // TODO set transaction status on your database to 'challenge'
        // and response with 200 OK
      } else if (fraudStatus == "accept") {
        transaction.payment_status = "success";
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
      }
    } else if (transactionStatus == "settlement") {
      transaction.payment_status = "success";
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      transaction.payment_status = "fail";
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
    } else if (transactionStatus == "pending") {
      transaction.payment_status = "pending";
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
    }

    await transaction.save();

    console.log(transaction);
    return;
  } catch (error) {}
};

module.exports = paymentHandling;
