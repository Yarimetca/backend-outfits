import prisma from "../prisma/client.js";

export const createClothes = async (req, res) => {
  try {
    const { name, image, categoryId } = req.body;
    const userId = req.user.id;

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
    const userId = req.user.id;

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
    const userId = req.user.id;

    const clothe = await prisma.clothes.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });

    if (!clothe) {
      return res.status(404).json({ error: "Prenda no encontrada o no tienes permiso" });
    }

    await prisma.clothes.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Prenda eliminada" });
  } catch (error) {
    console.error("Error en deleteClothes:", error);
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, categoryId } = req.body;
    const userId = req.user.id;

    const existingClothe = await prisma.clothes.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });

    if (!existingClothe) {
      return res.status(404).json({ error: "Prenda no encontrada o no tienes permiso" });
    }

    const updatedClothe = await prisma.clothes.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existingClothe.name,
        image: image ?? existingClothe.image,
        categoryId: categoryId ? Number(categoryId) : existingClothe.categoryId,
      },
    });

    res.json(updatedClothe);
  } catch (error) {
    console.error("Error en updateClothes:", error);
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};

export const getClothes = async (req, res) => {
  try {
    const userId = req.user.id;

    const clothes = await prisma.clothes.findMany({
      where: {
        userId: Number(userId),
      },
    });

    res.json(clothes);
  } catch (error) {
    console.error("Error en getClothes:", error);
    res.status(500).json({ error: "Error al obtener prendas" });
  }
};
