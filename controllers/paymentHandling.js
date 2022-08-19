const { Transaction } = require("../model");

const paymentHandling = async (responseData) => {
    try {
        console.log(responseData.order_id);
        const regPat = /responseData.order_id/;
        console.log(regPat);
        const transaction = await Transaction.find({
            order_id: regPat
        })
        console.log(transaction);
        return;
    } catch (error) {
        
    }
};

module.exports = paymentHandling;
