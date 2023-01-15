import { Apikey } from "../../model/index.model.js";
import axios from "axios";
const { post } = axios;
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const { connect } = mongoose;

export default async (api_keys) => {
  try {
    const value = await Promise.allSettled(
      api_keys.map(async (apiKey) => {
        try {
          await post("https://api.remove.bg/v1.0/removebg", null, {
            headers: {
              "X-Api-Key": apiKey.key,
            },
            responseType: "arraybuffer",
            encoding: null,
          });
        } catch (error) {
          if (error.response.status !== 402) {
            return apiKey.key;
          } else {
            return null;
          }
        }
      })
    );
    const valid = value
      .filter((data) => {
        return data.status !== "rejected";
      })
      .map((element) => {
        return element.value;
      });
    return Promise.allSettled(
      valid.map(async (element) => {
        try {
          const api_key = await Apikey.findOneAndUpdate(
            { key: element },
            { api_credit: 100 }
          );
          return {
            _id: api_key._id,
            key: element,
            status: "renewed",
          };
        } catch (error) {
          return {
            key: element,
            status: "failed",
          };
        }
      })
    );
  } catch (error) {
    throw error;
  }
};
