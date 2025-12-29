import prisma from "../prisma/client.js";

export const createClothes = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const { name, categoryId, color, style, season } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!name || !categoryId || !color || !style || !season) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Imagen requerida" });
    }

    const newClothes = await prisma.clothes.create({
      data: {
        name: String(name),
        image: req.file.path,
        categoryId: Number(categoryId),
        userId: Number(userId),
        color: String(color),
        style: String(style),
        season: String(season),
      },
    });

    return res.status(201).json(newClothes);
  } catch (error) {
    console.error("Error en createClothes:", error);
    return res.status(500).json({ error: "Error al crear prenda" });
  }
};


export const getClothes = async (req, res) => {
  try {
    const userId = req.user?.id;

    const clothes = await prisma.clothes.findMany({
      where: { userId: Number(userId) },
    });

    res.json(clothes);
  } catch (error) {
    console.error("Error en getClothes:", error);
    res.status(500).json({ error: "Error al obtener prendas" });
  }
};

export const getClothesById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

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

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, color, style, season } = req.body;
    const userId = req.user?.id;

    const existingClothe = await prisma.clothes.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });

    if (!existingClothe) {
      return res
        .status(404)
        .json({ error: "Prenda no encontrada o no tienes permiso" });
    }

    const updatedClothe = await prisma.clothes.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existingClothe.name,
        image: req.file
          ? `/uploads/${req.file.filename}`
          : existingClothe.image,
        categoryId: categoryId
          ? Number(categoryId)
          : existingClothe.categoryId,
        color: color ?? existingClothe.color,
        style: style ?? existingClothe.style,
        season: season ?? existingClothe.season,
      },
    });

    res.json(updatedClothe);
  } catch (error) {
    console.error("Error en updateClothes:", error);
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const clothe = await prisma.clothes.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });

    if (!clothe) {
      return res
        .status(404)
        .json({ error: "Prenda no encontrada o no tienes permiso" });
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
