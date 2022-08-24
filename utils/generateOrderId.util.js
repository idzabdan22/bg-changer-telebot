const generateOrderId = (userId) => `${userId}${new Date().getTime()}`;
module.exports = generateOrderId;
