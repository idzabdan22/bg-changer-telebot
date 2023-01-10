import dotenv from "dotenv";
dotenv.config();

const headerConfig = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getSandBoxHeader = () => {
  headerConfig.Authorization = process.env.MIDTRANS_AUTHORIZATION_SANDBOX;
  return headerConfig;
};

const getProductionHeader = () => {
  headerConfig.Authorization = process.env.MIDTRANS_AUTHORIZATION_PRODUCTION;
  return headerConfig;
};

export {
  getSandBoxHeader,
  getProductionHeader,
};
