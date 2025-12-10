import express from "express";
import { 
  createClothes, 
  getClothes,   
  getClothesById,
  deleteClothes, 
  updateClothes 
} from "../controllers/clothesController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getClothes);  
router.post("/", authMiddleware, createClothes);
router.get("/:id", authMiddleware, getClothesById);
router.put("/:id", authMiddleware, updateClothes);
router.delete("/:id", authMiddleware, deleteClothes);

export default router;
