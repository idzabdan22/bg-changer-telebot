import { Apikey } from "../../model/index.model.js";

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

export default apiKeyGenerator;
