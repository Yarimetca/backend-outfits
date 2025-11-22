import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearPrenda = async (req, res) => {
  try {
    const { nombre, color, usuarioId } = req.body;

    const nueva = await prisma.Prenda.create({
      data: {
        nombre,
        color,
        usuarioId,
      },
    });

    res.json(nueva);
  } catch (error) {
    console.error("Error al crear prenda:", error);
    res.status(500).json({ error: "Error al crear prenda" });
  }
};

export const listarPrendas = async (req, res) => {
  try {
    const prendas = await prisma.Prenda.findMany();
    res.json(prendas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener prendas" });
  }
};

export const obtenerPrenda = async (req, res) => {
  try {
    const prenda = await prisma.Prenda.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!prenda) return res.status(404).json({ error: "Prenda no encontrada" });

    res.json(prenda);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener prenda" });
  }
};

export const actualizarPrenda = async (req, res) => {
  try {
    const actualizada = await prisma.Prenda.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};

export const eliminarPrenda = async (req, res) => {
  try {
    await prisma.Prenda.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ mensaje: "Prenda eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};
