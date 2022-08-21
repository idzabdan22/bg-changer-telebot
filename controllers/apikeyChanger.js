const { Apikey } = require("../model");

const apiKeyGenerator = async () => {
  try {
    const res = await Apikey.find({
      api_credit: { $gt: 0 },
    });
    return res[0];
  } catch (error) {
    throw error;
  }
};

module.exports = apiKeyGenerator;
