import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import prisma from "./prisma/client.js";

dotenv.config();

const app = express();

// 1. Configuración de Middlewares
app.use(cors());
app.use(express.json());

// 2. LA MAGIA: Servir archivos estáticos
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 3. Rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
// ================== DEBUG GEMINI MODELS ==================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/debug/models", async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json(models);
  } catch (err) {
    console.error("ERROR listModels:", err);
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});


// 4. Arrancar servidor una sola vez con conexión a base de datos
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  try {
    await prisma.$connect();
    console.log("Prisma conectado a la base de datos");
  } catch (err) {
    console.error("Error conectando Prisma:", err);
  }
});