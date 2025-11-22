import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/usuariosRoutes.js";
import prendasRoutes from "./routes/prendasRoutes.js";
import estilosRoutes from "./routes/estilosRoutes.js";
import outfitsRoutes from "./routes/outfitsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/prendas", prendasRoutes);
app.use("/estilos", estilosRoutes);
app.use("/outfits", outfitsRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
