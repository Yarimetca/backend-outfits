import { Router } from "express";
import {
  createClothes,
  getClothes,
  updateClothes,
  deleteClothes,
} from "../controllers/clothesController.js";

const router = Router();

router.post("/", createClothes);
router.get("/", getClothes);
router.put("/:id", updateClothes);
router.delete("/:id", deleteClothes);

export default router;