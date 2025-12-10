  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv";
  import path from "path";
  import routes from "./routes/index.js";
  import prisma from "./prisma/client.js";

  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());
app.use("/uploads", express.static("/tmp/uploads"));

  app.use("/api", routes);
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    try {
      await prisma.$connect();
      console.log("Prisma conectado");
    } catch (err) {
      console.error("Prisma connect error:", err);
    }
  });

    