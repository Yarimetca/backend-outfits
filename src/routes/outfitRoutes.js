import express from "express";
import {
  createOutfit,
  getOutfits
} from "../controllers/outfitController.js";

const router = express.Router();

router.post("/", createOutfit);
router.get("/", getOutfits);

export default router;
