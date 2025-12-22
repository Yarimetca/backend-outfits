import express from "express";
import { recommendOutfit } from "../controllers/outfitController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/recommend", auth, recommendOutfit);

export default router;
