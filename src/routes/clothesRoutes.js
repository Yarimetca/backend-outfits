import { Router } from "express";
import { createClothes, getClothes } from "../controllers/clothesController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.post("/", auth, createClothes);
router.get("/", auth, getClothes);
export default router;
