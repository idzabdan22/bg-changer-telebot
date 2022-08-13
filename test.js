// const axios = require("axios");
// const FormData = require("form-data");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// // // URL of the image
// // const url = 'GFG.jpeg';

// // https.get(url,(res) => {
// // 	// Image will be stored at this path
// // 	const path = `${__dirname}/files/img.jpeg`;
// // 	const filePath = fs.createWriteStream(path);
// // 	res.pipe(filePath);
// // 	filePath.on('finish',() => {
// // 		filePath.close();
// // 		console.log('Download Completed');
// // 	})
// // })

// const inputPath = "photos/1139051246.jpg";
// const formData = new FormData();
// formData.append("chat_id", "1139051246");
// formData.append("photo", fs.createReadStream(inputPath), path.basename(inputPath));

// // console.log(formData.getHeaders());

// axios({
//   method: "post",
//   url: "https://api.telegram.org/bot5568457002:AAG8OuUFFkeqhPNubktl2SjaTSwSnzufv4I/sendPhoto",
//   data: formData,
// })
//   .then((response) => {
//     //   if(response.status != 200);
//     // console.log("SUCCESSS", response.data);
//     //   fs.writeFileSync("no-bg.png", response.data);

//   })
//   .catch((error) => {
//     console.log("ERROR");
//     // return console.error('Request failed:', error);
//   });

// // const inputPath = "photos/pt_1.jpg";
// // const formData = new FormData();
// // formData.append("size", "auto");
// // formData.append("image_file", fs.createReadStream(inputPath), path.basename(inputPath));

// // console.log(formData.getHeaders());

// // axios({
// //   method: "post",
// //   url: "https://api.remove.bg/v1.0/removebg",
// //   data: formData,
// //   responseType: "arraybuffer",
// //   headers: {
// //     ...formData.getHeaders(),
// //     "X-Api-Key": process.env.REMOVEBG_TOKEN,
// //   },
// //   encoding: null,
// // })
// //   .then((response) => {
// //       if(response.status != 200);
// //     console.log("SUCCESSS", response.data);
// //       fs.writeFileSync("no-bg1.png", response.data);
// //   })
// //   .catch((error) => {
// //     console.log("ERROR");
// //     // return console.error('Request failed:', error);
// //   });

// const randomNum = Math.floor(Math.random() * 6);
// console.log(randomNum);

console.log(process.cwd());

const test = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("HI IM ASYNC");
      console.log("AFTER ASYNC 3 sec");
    }, 3000);
  });
};

function an() {
  test();
}

an();
console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOO");

const {
  getProductionHeader,
  getSandBoxHeader,
} = require("./config/midtransHeaderConfig");
const generateOrderId = require("./utils/generateOrderId");

console.log(getProductionHeader());

console.log(generateOrderId(1235554));

console.log(new Date().toUTCString());
console.log(new Date().toLocaleDateString());
console.log(new Date().toISOString());
// console.log(new Date().toUTCString());

console.log(new Date(1660385098455));

// console.log(new Date(1660314611520));
