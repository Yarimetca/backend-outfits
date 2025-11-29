import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createClothes = async (req, res) => {
  try {
    const { name, color, imageUrl, userId, categoryId } = req.body;

    if (!name) return res.status(400).json({ error: "Clothes name required" });

    const clothes = await prisma.clothes.create({
      data: { name, color, imageUrl, userId, categoryId },
    });

    res.status(201).json(clothes);
  } catch (error) {
    console.error("Error creating clothes:", error);
    res.status(500).json({ error: "Error creating clothes" });
  }
};

export const getClothes = async (req, res) => {
  const clothes = await prisma.clothes.findMany();
  res.json(clothes);
};
