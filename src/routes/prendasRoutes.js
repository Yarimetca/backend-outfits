import express from "express";
import {
  obtenerPrendas,
  crearPrenda,
  actualizarPrenda,
  eliminarPrenda
} from "../controllers/prendasController.js";

const router = express.Router();

router.get("/", obtenerPrendas);
router.post("/", crearPrenda);
router.put("/:id", actualizarPrenda);
router.delete("/:id", eliminarPrenda);

export default router;
