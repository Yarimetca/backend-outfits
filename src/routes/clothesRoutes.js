import { Router } from "express";
import { createClothes, getClothes } from "../controllers/clothesController.js";
import auth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/", auth, upload.single("file"), createClothes);
router.get("/", auth, getClothes);

export default router;
