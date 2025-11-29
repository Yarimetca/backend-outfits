import express from "express";
import { getStyles, createStyle } from "../controllers/styleController.js";

const router = express.Router();

router.get("/", getStyles);
router.post("/", createStyle);

export default router;
