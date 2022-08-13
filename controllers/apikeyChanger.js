const removeBackground = require("./removeBackground");
const sendMessage = require("./sendMessageTele");
const axios = require("axios");
const fs = require("fs");
const mongoose = require("mongoose");
const { User, Data, History, Apikey } = require("../model");
const Path = require("path");
const sendDocument = require("./sendDocTele");
const sendPhoto = require("./sendPhotoTele");
require("dotenv").config();

const apiKeyGenerator = async () => {
  try {
    const res = await Apikey.find({
      api_credit: { $gt: 0 },
    });
    return res[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = apiKeyGenerator;
