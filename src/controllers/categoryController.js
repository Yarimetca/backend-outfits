import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.json({ message: "Categoría creada correctamente", category });
  } catch (err) {
    console.error("Error real al crear categoría:", err); 
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        outfits: true,
        clothes: true,
      },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json({ message: "Categoría actualizada", category });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};
