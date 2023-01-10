const generateOrderId = (userId) => `${userId}${new Date().getTime()}`;
export default generateOrderId;
