// // const axios = require("axios");
// // const FormData = require("form-data");
// // const fs = require("fs");
// // const path = require("path");
// // require("dotenv").config();

// // // // URL of the image
// // // const url = 'GFG.jpeg';

// // // https.get(url,(res) => {
// // // 	// Image will be stored at this path
// // // 	const path = `${__dirname}/files/img.jpeg`;
// // // 	const filePath = fs.createWriteStream(path);
// // // 	res.pipe(filePath);
// // // 	filePath.on('finish',() => {
// // // 		filePath.close();
// // // 		console.log('Download Completed');
// // // 	})
// // // })

// // const inputPath = "photos/1139051246.jpg";
// // const formData = new FormData();
// // formData.append("chat_id", "1139051246");
// // formData.append("photo", fs.createReadStream(inputPath), path.basename(inputPath));

// // // console.log(formData.getHeaders());

// // axios({
// //   method: "post",
// //   url: "https://api.telegram.org/bot5568457002:AAG8OuUFFkeqhPNubktl2SjaTSwSnzufv4I/sendPhoto",
// //   data: formData,
// // })
// //   .then((response) => {
// //     //   if(response.status != 200);
// //     // console.log("SUCCESSS", response.data);
// //     //   fs.writeFileSync("no-bg.png", response.data);

// //   })
// //   .catch((error) => {
// //     console.log("ERROR");
// //     // return console.error('Request failed:', error);
// //   });

// // // const inputPath = "photos/pt_1.jpg";
// // // const formData = new FormData();
// // // formData.append("size", "auto");
// // // formData.append("image_file", fs.createReadStream(inputPath), path.basename(inputPath));

// // // console.log(formData.getHeaders());

// // // axios({
// // //   method: "post",
// // //   url: "https://api.remove.bg/v1.0/removebg",
// // //   data: formData,
// // //   responseType: "arraybuffer",
// // //   headers: {
// // //     ...formData.getHeaders(),
// // //     "X-Api-Key": process.env.REMOVEBG_TOKEN,
// // //   },
// // //   encoding: null,
// // // })
// // //   .then((response) => {
// // //       if(response.status != 200);
// // //     console.log("SUCCESSS", response.data);
// // // //       fs.writeFileSync("no-bg1.png", response.data);
// // // //   })
// // // //   .catch((error) => {
// // // //     console.log("ERROR");
// // // //     // return console.error('Request failed:', error);
// // // //   });

// // // const randomNum = Math.floor(Math.random() * 6);
// // // console.log(randomNum);

// // console.log(process.cwd());

// // const test = async () => {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       resolve("HI IM ASYNC");
// //       console.log("AFTER ASYNC 3 sec");
// //     }, 3000);
// //   });
// // };

// // function an() {
// //   test();
// // }

// // an();
// // console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOO");

// // const {
// //   getProductionHeader,
// //   getSandBoxHeader,
// // } = require("./config/midtransHeaderConfig");
// // const generateOrderId = require("./utils/generateOrderId");

// // console.log(getProductionHeader());

// // console.log(generateOrderId(1235554));

// // console.log(new Date().toUTCString());
// // console.log(new Date().toLocaleDateString());
// // console.log(new Date().toISOString());
// // // console.log(new Date().toUTCString());

// // console.log(new Date(1660385098455));

// // console.log(new Date(1660314611520));

// // const dates = new Date();
// // console.log(dates);
// // console.log(dates.toISOString());
// // console.log(dates.toLocaleString());
// // console.log(dates.getTime()); //Millisecond since 1 january 1970

// // const pay = [];

// // if (pay.length) console.log(pay);

// const sharp = require("sharp");
// const fs = require("fs");

// (async () => {
//   const data = await sharp("photos/imagekecil.jpg").resize(2048).toBuffer();

//   console.log(data);

//   fs.writeFileSync("photos/image.jpg", data);
// })();

// // const semiTransparentRedPng = await sharp({
// //   create: {
// //     width: 2048,
// //     height: 2561,
// //     channels: 4,
// //     background: { r: 255, g: 0, b: 0, alpha: 0.5 },
// //   },
// // })
// //   .png()
// //   .toBuffer();

// import { imageResizer } from "./function/main";
// import { writeFileSync } from "fs";

// imageResizer("./photos/a.jpeg", 500, 500).then((data) => {
//   console.log(data);
//   writeFileSync("./photos/a-resized.jpg", data);
// });

import { Apikey } from "./model/index.model.js";
import axios from "axios";
const { post } = axios;
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const { connect } = mongoose;

const function_1 = async (api_keys) => {
  try {
    const tobe_renewed_api = api_keys.map(async (apiKey) => {
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
          return new Promise((resolve, reject) => {
            resolve(apiKey.key);
          });
        } else {
          return new Promise((resolve, reject) => {
            reject(apiKey.key);
          });
        }
      }
    });
    Promise.allSettled(tobe_renewed_api).then(async (value) => {
      console.log(value);
      const valid = value
        .filter((data) => {
          return data.status !== "rejected";
        })
        .map((element) => {
          return element.value;
        });
      console.time("n");
      // await Apikey.updateMany({ key: valid }, { $set: { api_credit: 50 } });
      valid.forEach(async (element) => {
        const res = await Apikey.findOneAndUpdate({ key: element }, { api_credit: 100 });
        console.log(res);
      });
      console.timeEnd("n");
      return;
    });
  } catch (error) {
    // console.log(error);
  }
};

const function_2 = async () => {};

try {
  const dbUrl = process.env.DB;

  // console.log(dbUrl);

  connect(dbUrl)
    .then(() => {
      console.log("Success Connect to MongoDB");
      // console.log(res)
    })
    .catch((err) => {
      console.log("Failed Connect to MongoDB", err);
    });

  const api_keys = await Apikey.find({
    api_credit: { $eq: 50 },
  });

  // console.log(api_keys);
  console.time();

  function_1(api_keys);

  // const statusCodeEachKey = api_keys.map((apiKey) => {
  //   return post("https://api.remove.bg/v1.0/removebg", null, {
  //     headers: {
  //       "X-Api-Key": apiKey.key,
  //     },
  //     responseType: "arraybuffer",
  //     encoding: null,
  //   });
  // });
  // console.log(statusCodeEachKey);
  // const new_api = api_keys.map((element) => {});
  // Promise.allSettled(statusCodeEachKey).then((value) => {
  //   // console.log(value[0].);
  //   value.forEach(async (element) => {
  //     console.log(element.reason.response);
  //   });
  //   return;
  //   const datas = value.map((data) => {
  //     return data.reason.response.status;
  //   });
  //   console.log("DATA", datas);
  //   res.send({ data: datas, duplicate_index: duplicate_index });
  // });
  // statu.forEach((element) => {});
  // res.status(200).send({});
} catch (error) {
  // res.status(500).send({});
}
