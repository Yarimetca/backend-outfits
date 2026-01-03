import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import prisma from "./prisma/client.js";

dotenv.config();

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Servir imágenes subidas
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 3. Rutas principales
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

// 4. Arrancar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  try {
    await prisma.$connect();
    console.log("✅ Prisma conectado a la base de datos");
  } catch (err) {
    console.error("❌ Error conectando Prisma:", err);
  }
});
