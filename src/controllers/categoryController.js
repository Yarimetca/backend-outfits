import prisma from "../prisma/client.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creando categoría" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo categorías" });
  }
};
