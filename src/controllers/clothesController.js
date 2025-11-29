import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.create({
      data: req.body,
    });
    res.json({ message: "Prenda creada correctamente", clothes });
  } catch (err) {
    res.status(500).json({ error: "Error al crear prenda" });
  }
};

export const getClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.findMany({
      include: {
        category: true,
        user: true,
        outfits: true,
      },
    });
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener prendas" });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const clothes = await prisma.clothes.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json({ message: "Prenda actualizada", clothes });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};


export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.clothes.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Prenda eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};
