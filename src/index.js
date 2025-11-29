import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/clothes", clothesRoutes);
app.use("/outfits", outfitRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente.");
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
ss