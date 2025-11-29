import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta pública
app.use("/public", express.static(path.join(__dirname, "public")));

// Importar routers
import clothesRoutes from "./routes/clothesRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Registrar routers con prefijo /api
app.use("/api/clothes", clothesRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

// Puerto
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
