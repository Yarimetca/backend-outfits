import express from "express";
import auth from "../middleware/auth.js";
import { getRecommendation } from "../controllers/outfitController.js";

const router = express.Router();

// Ahora la ruta llama a la función del controlador
router.get("/recommend", auth, getRecommendation);

export default router;