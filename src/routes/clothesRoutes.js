import express from "express";
import {
  crearPrenda,
  listarPrendas,
  obtenerPrenda,
  actualizarPrenda,
  eliminarPrenda,
} from "../controllers/prendasController.js";

const router = express.Router();

router.get("/", listarPrendas);
router.get("/:id", obtenerPrenda);
router.post("/", crearPrenda);
router.put("/:id", actualizarPrenda);
router.delete("/:id", eliminarPrenda);

export default router;
