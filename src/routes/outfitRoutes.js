import { Router } from "express";
import { getRecommendation } from "../controllers/outfitController.js";

const router = Router();

router.get("/recommend", getRecommendation);

export default router;
