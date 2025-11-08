import express from "express";
import {
  obtenerOutfits,
  crearOutfit,
  actualizarOutfit,
  eliminarOutfit,
} from "../controllers/outfitsController.js";

const router = express.Router();

router.get("/", obtenerOutfits);
router.post("/", crearOutfit);
router.put("/:id", actualizarOutfit);
router.delete("/:id", eliminarOutfit);

export default router;
