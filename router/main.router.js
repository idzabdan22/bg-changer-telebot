import { Router } from "express";
const router = Router();
import * as mainController from "../controllers/main.controller.js";

router.route("/").get(mainController.index).post(mainController.handleTelegram);

export default router;
