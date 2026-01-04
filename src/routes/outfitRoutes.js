import { Router } from "express";
import { getRecommendation } from "../controllers/outfitController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/recommend", auth, getRecommendation);

export default router;
