import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import prisma from "./prisma/client.js";

dotenv.config();

const app = express();

app.use(cors());
app.use("/api/outfits", outfitRoutes);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/outfits", require("./routes/outfit.routes"))
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  await prisma.$connect();
  console.log("✅ Prisma conectado");
});
