import prisma from "../prisma/client.js";

// 1. CREAR PRENDA (Subir ropa)
export const createClothes = async (req, res) => {
  try {
    const { name, categoryId, color, style, season } = req.body;
    const userId = req.user?.id;

    // Validación: Si no hay archivo, lanzamos error
    if (!req.file) {
      return res.status(400).json({ error: "Debes subir una imagen de la prenda" });
    }

    const newClothes = await prisma.clothes.create({
      data: {
        name: String(name),
        // Limpiamos la URL para que siempre use barras frontales /
        image: req.file.path.replace(/\\/g, "/"), 
        categoryId: Number(categoryId),
        userId: Number(userId),
        color: String(color || "Indefinido"),
        style: String(style || "Casual"),
        season: String(season || "Todas"),
      },
    });

    console.log("Prenda creada con éxito:", newClothes.id);
    return res.status(201).json(newClothes);
  } catch (error) {
    console.error("Error en createClothes:", error);
    res.status(500).json({ error: "No se pudo guardar la prenda en la base de datos" });
  }
};

// 2. OBTENER TODA LA ROPA (Del usuario logueado)
export const getClothes = async (req, res) => {
  try {
    const userId = req.user?.id;

    const clothes = await prisma.clothes.findMany({
      where: { userId: Number(userId) },
      orderBy: { id: 'desc' } // Trae las más nuevas primero
    });

    res.json(clothes);
  } catch (error) {
    console.error("Error en getClothes:", error);
    res.status(500).json({ error: "Error al obtener tu armario" });
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