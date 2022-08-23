const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");

router.route("/").get(mainController.index).post(mainController.handleTelegram);

module.exports = router;
