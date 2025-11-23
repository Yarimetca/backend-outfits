import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerEstilos = async (req, res) => {
  try {
    const estilos = await prisma.estilo.findMany();
    res.json(estilos);
  } catch (err) {
    console.error("Error al obtener estilos:", err);
    res.status(500).json({ error: "Error al obtener estilos" });
  }
};

export const crearEstilo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "Falta el nombre del estilo" });
    }

    const nuevoEstilo = await prisma.estilo.create({
      data: { nombre, descripcion },
    });

    res.status(201).json(nuevoEstilo);
  } catch (err) {
    console.error("Error al crear estilo:", err);
    res.status(500).json({ error: "Error al crear estilo" });
  }
};
