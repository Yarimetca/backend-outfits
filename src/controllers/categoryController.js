import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Category name required" });

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Error creating category" });
  }
};

export const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};
