import { Router } from "express";
import { createOutfit, getOutfits } from "../controllers/outfitController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.post("/", auth, createOutfit);
router.get("/", auth, getOutfits);
export default router;
