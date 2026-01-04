import prisma from "../prisma/client.js";


// CREAR PRENDA
export const createClothes = async (req, res) => {
  try {
    const { name, color, style, season, categoryId } = req.body;
    const userId = Number(req.user?.id);

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Debes subir una imagen" });
    }

    const newClothes = await prisma.clothes.create({
      data: {
        name: name || "Sin nombre",
        image: req.file.path, // ✅ URL CLOUDINARY DIRECTA
        categoryId: Number(categoryId),
        userId,
        color: color || "Indefinido",
        style: style || "casual",
        season: season || "todas",
      },
    });

    res.status(201).json(newClothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear prenda" });
  }
};

// OBTENER PRENDAS
export const getClothes = async (req, res) => {
  try {
    const userId = Number(req.user?.id);

if (!userId) {
  return res.status(401).json({ error: "Usuario no autenticado" });
}

    const clothes = await prisma.clothes.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { id: "desc" },
    });

    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener prendas" });
  }
};


// 3. OBTENER UNA PRENDA POR ID
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
    res.status(500).json({ error: "Error al obtener la prenda" });
  }
};

// 4. ACTUALIZAR PRENDA
export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, color, style, season } = req.body;
    const userId = req.user?.id;

    const existingClothe = await prisma.clothes.findFirst({
      where: { id: Number(id), userId: Number(userId) },
    });

    if (!existingClothe) {
      return res.status(404).json({ error: "No tienes permiso o no existe" });
    }

    const updatedClothe = await prisma.clothes.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existingClothe.name,
        // Si subes una foto nueva, la actualizamos; si no, dejamos la anterior
        image: req.file ? req.file.path.replace(/\\/g, "/") : existingClothe.image,
        categoryId: categoryId ? Number(categoryId) : existingClothe.categoryId,
        color: color ?? existingClothe.color,
        style: style ?? existingClothe.style,
        season: season ?? existingClothe.season,
      },
    });

    res.json(updatedClothe);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

// 5. ELIMINAR PRENDA
export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const clothe = await prisma.clothes.findFirst({
      where: { id: Number(id), userId: Number(userId) },
    });

    if (!clothe) {
      return res.status(404).json({ error: "No se encontró la prenda" });
    }

    await prisma.clothes.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Prenda eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};