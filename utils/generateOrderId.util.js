module.exports.generateOrderId = (userId) => `${userId}${new Date().getTime()}`;

