import { Router } from "express";
import {
  createOutfit,
  getOutfits,
  updateOutfit,
  deleteOutfit,
} from "../controllers/outfitController.js";

const router = Router();

router.post("/", createOutfit);
router.get("/", getOutfits);
router.put("/:id", updateOutfit);
router.delete("/:id", deleteOutfit);

export default router;