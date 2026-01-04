import { Router } from "express";
import { getRecommendation } from "../controllers/outfitController.js";
import auth from "../middleware/auth.js";
import prisma from "../prisma/client.js"; // ✅ FALTABA ESTO

const router = Router();

router.get("/recommend", auth, getRecommendation);

// ⚠️ SOLO PARA DEBUG – BORRA DESPUÉS
router.delete("/__wipe__", async (req, res) => {
  try {
    await prisma.clothes.deleteMany();
    res.json({ ok: true, message: "🧹 PRENDAS BORRADAS" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
