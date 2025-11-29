import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOutfit = async (req, res) => {
  try {
    const { name, description, imageUrl, userId, categoryId } = req.body;

    if (!name || !userId || !categoryId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const outfit = await prisma.outfit.create({
      data: { name, description, imageUrl, userId, categoryId },
    });

    res.status(201).json(outfit);
  } catch (error) {
    console.error("Error creating outfit:", error);
    res.status(500).json({ error: "Error creating outfit" });
  }
};

export const getOutfits = async (req, res) => {
  const outfits = await prisma.outfit.findMany();
  res.json(outfits);
};

