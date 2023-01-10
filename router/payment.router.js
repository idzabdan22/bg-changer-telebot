import { Router } from "express";
const router = Router();
import * as paymentController from "../controllers/payment.controller.js";

router.route("/handling").post(paymentController.paymentHandling);
router.route("/unfinish").post(paymentController.paymentUnfinish);

export default router;
