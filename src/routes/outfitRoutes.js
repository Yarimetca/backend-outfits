import express from "express";
import { recommendOutfit } from "../controllers/outfitController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/recommend", authMiddleware, recommendOutfit);

export default router;
