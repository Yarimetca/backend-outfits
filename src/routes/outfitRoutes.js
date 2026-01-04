import { Router } from "express";
import { getRecommendation } from "../controllers/outfitController.js";
import auth from "../middleware/auth.js";
import prisma from "../prisma/client.js";

const router = Router();

// 🔹 Recomendación de outfit
router.get("/recommend", auth, getRecommendation);

// 🔥 BORRAR TODO (TEMPORAL)
router.delete("/__wipe__", async (req, res) => {
  try {
    await prisma.outfit.deleteMany();
    await prisma.clothes.deleteMany();

    res.json({ ok: true, message: "TODO BORRADO" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ERROR AL BORRAR" });
  }
});

export default router;
