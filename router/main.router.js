import { Router } from "express";
const router = Router();
import { index, handleTelegram } from "../controllers/main.controller.js";

router.route("/").get(index).post(handleTelegram);

export default router;
