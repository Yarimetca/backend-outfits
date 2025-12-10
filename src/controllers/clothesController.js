import prisma from "../config/prisma.js";

export const createClothes = async (req, res) => {
  try {
    const { name, image, categoryId } = req.body;
    const userId = req.userId;

    if (!name || !categoryId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newClothes = await prisma.clothes.create({
      data: {
        name,
        image: image || null,
        categoryId: Number(categoryId),
        userId: Number(userId),
      },
    });

    res.json(newClothes);
  } catch (error) {
    console.error("Error en createClothes:", error);
    res.status(500).json({ error: "Error al crear prenda" });
  }
};

export const getClothesById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const clothe = await prisma.clothes.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),   
      },
    });

    if (!clothe) {
      return res.status(404).json({ error: "Prenda no encontrada" });
    }

    res.json(clothe);
  } catch (error) {
    console.error("Error en getClothesById:", error);
    res.status(500).json({ error: "Error al obtener prenda" });
  }
};

export const deleteClothes = async (req, res) => {
  try {   
    const { id } = req.params;

    await prisma.clothes.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Prenda eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};
