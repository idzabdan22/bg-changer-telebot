const { v4: uuidv4 } = require("uuid");
const base64 = require("base-64");

const generateOrderId = (userId) => `${userId}${new Date().getTime()}`;

module.exports = generateOrderId;
