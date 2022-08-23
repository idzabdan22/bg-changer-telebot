const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.route("/handling").post(paymentController.paymentHandling);
router.route("/unfinish").post(paymentController.paymentUnfinish);

module.exports = router;
