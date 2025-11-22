import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listarPrendas = async (req, res) => {
  try {
    const prendas = await prisma.prenda.findMany({
      include: { estilo: true, outfits: true }
    });
    res.json(prendas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar prendas" });
  }
};

export const obtenerPrenda = async (req, res) => {
  try {
    const prenda = await prisma.prenda.findUnique({
      where: { id: Number(req.params.id) },
      include: { estilo: true, outfits: true }
    });

    if (!prenda) {
      return res.status(404).json({ error: "Prenda no encontrada" });
    }

    res.json(prenda);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener prenda" });
  }
};

export const crearPrenda = async (req, res) => {
  try {
    const { nombre, color, imagen, estiloId } = req.body;

    const data = {
      nombre,
      color,
      imagen,
    };

    if (estiloId) {
      data.estiloId = Number(estiloId);
    }

    const nueva = await prisma.prenda.create({ data });

    res.json(nueva);
  } catch (error) {
    console.error("Error al crear prenda:", error);
    res.status(500).json({ error: "Error al crear prenda" });
  }
};

export const actualizarPrenda = async (req, res) => {
  try {
    const { nombre, color, imagen, estiloId } = req.body;

    const data = {
      nombre,
      color,
      imagen,
    };

    if (estiloId) {
      data.estiloId = Number(estiloId);
    } else {
      data.estiloId = null; // si NO mandas estiloId, lo quitamos
    }

    const prendaActualizada = await prisma.prenda.update({
      where: { id: Number(req.params.id) },
      data
    });

    res.json(prendaActualizada);
  } catch (error) {
    console.error("Error al actualizar prenda:", error);
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};

export const eliminarPrenda = async (req, res) => {
  try {
    await prisma.prenda.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: "Prenda eliminada" });
  } catch (error) {
    console.error("Error al eliminar prenda:", error);
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};
