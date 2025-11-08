import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuariosRoutes.js"; 
import prendasRoutes from "./routes/prendasRoutes.js";
import estilosRoutes from "./routes/estilosRoutes.js";
import outfitsRoutes from "./routes/outfitsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/estilos", estilosRoutes);
app.use("/prendas", prendasRoutes);
app.use("/outfits", outfitsRoutes);


app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});


const PORT = 4001; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
