import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.post("/", auth, createCategory);
router.get("/", auth, getCategories);
export default router;
