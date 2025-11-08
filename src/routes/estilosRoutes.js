
import express from "express";
import {
  obtenerEstilos,
  obtenerEstiloPorId,
  crearEstilo,
  actualizarEstilo,
  eliminarEstilo,
} from "../controllers/estilosController.js";

const router = express.Router();

router.get("/", obtenerEstilos);
router.get("/:id", obtenerEstiloPorId);
router.post("/", crearEstilo);
router.put("/:id", actualizarEstilo);
router.delete("/:id", eliminarEstilo);

export default router;
