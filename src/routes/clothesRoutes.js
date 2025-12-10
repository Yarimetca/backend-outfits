import express from "express";
import {
  createClothes,
  getClothes,
  getClothesById,
  updateClothes,
  deleteClothes
} from "../controllers/clothesController.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createClothes);

router.get("/", authMiddleware, getClothes);


router.get("/:id", authMiddleware, getClothesById);

router.put("/:id", authMiddleware, updateClothes);

router.delete("/:id", authMiddleware, deleteClothes);

export default router;
