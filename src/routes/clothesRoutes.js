import express from "express";
import { createClothes, getClothes, deleteClothes } from "../controllers/clothesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createClothes);
router.get("/", authMiddleware, getClothes);
router.delete("/:id", authMiddleware, deleteClothes);

export default router;
