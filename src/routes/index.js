import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import clothesRoutes from "./clothesRoutes.js";
import outfitRoutes from "./outfitRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/clothes", clothesRoutes);
router.use("/outfits", outfitRoutes);

export default router;