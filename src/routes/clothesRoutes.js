import express from "express";
import { 
  createClothes, 
  getClothes, 
  deleteClothes, 
  updateClothes,
  getClothesById     
} from "../controllers/clothesController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createClothes);

router.get("/", authMiddleware, getClothes);

router.get("/:id", authMiddleware, getClothesById);

router.put("/:id", authMiddleware, updateClothes);

router.delete("/:id", authMiddleware, deleteClothes);

export default router;
