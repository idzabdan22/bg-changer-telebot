import { Router } from "express";
const router = Router();
import {
  index,
  handleTelegram,
  renewApiCredit,
} from "../controllers/main.controller.js";

router.route("/").get(index).post(handleTelegram);
router.route("/apikey-checker").get(renewApiCredit);

export default router;
