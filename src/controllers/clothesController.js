
import prisma from "../prisma/client.js";
import fs from "fs";
import path from "path";

const removeFileIfExists = (imagePath) => {
  if (!imagePath) return;
  const clean = imagePath.replace(/^\//, ""); 
  const filePath = path.join(process.cwd(), clean);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Error borrando archivo:", err);
    }
  }
};

export const createClothes = async (req, res) => {
  try {
    const { name, categoryId, userId: bodyUserId, type, color } = req.body;
    const userId = Number(req.user?.id ?? bodyUserId);

    if (!name) return res.status(400).json({ message: "El nombre es requerido" });
    if (!categoryId) return res.status(400).json({ message: "categoryId es requerido" });
    if (!userId) return res.status(400).json({ message: "userId es requerido" });

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const clothes = await prisma.clothes.create({
      data: {
        name,
        ...(type && { type }),
        ...(color && { color }),
        image,
        category: { connect: { id: Number(categoryId) } },
        user: { connect: { id: Number(userId) } }
      }
    });

    res.json(clothes);
  } catch (err) {
    console.error("Error en createClothes:", err);
    res.status(500).json({ message: "Error creando prenda" });
  }
};

export const getClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.findMany({
      include: {
        category: true,
        user: true
      }
    });

    res.json(clothes);
  } catch (err) {
    console.error("Error en getClothes:", err);
    res.status(500).json({ message: "Error obteniendo prendas" });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, userId: bodyUserId, type, color } = req.body;
    const userId = Number(req.user?.id ?? bodyUserId);

    const image = req.file ? `/uploads/${req.file.filename}` : undefined;


    const exists = await prisma.clothes.findUnique({ where: { id: Number(id) } });
    if (!exists) return res.status(404).json({ message: "Prenda no encontrada" });

    if (image && exists.image) removeFileIfExists(exists.image);

    const updated = await prisma.clothes.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(color && { color }),
        ...(image && { image }),
        ...(categoryId && { category: { connect: { id: Number(categoryId) } } }),
        ...(userId && { user: { connect: { id: Number(userId) } } })
      }
    });

    res.json(updated);
  } catch (err) {
    console.error("Error en updateClothes:", err);
    res.status(500).json({ message: "Error actualizando prenda" });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;

    const clothes = await prisma.clothes.findUnique({
      where: { id: Number(id) }
    });

    if (!clothes) {
      return res.status(404).json({ message: "Prenda no encontrada" });
    }

    if (clothes.image) removeFileIfExists(clothes.image);

    await prisma.clothes.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Prenda eliminada correctamente" });
  } catch (err) {
    console.error("Error en deleteClothes:", err);
    res.status(500).json({ message: "Error eliminando prenda" });
  }
};
