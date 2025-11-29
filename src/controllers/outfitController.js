import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOutfit = async (req, res) => {
  try {
    const outfit = await prisma.outfit.create({
      data: req.body,
    });
    res.json(outfit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOutfits = async (req, res) => {
  try {
    const outfits = await prisma.outfit.findMany({
      include: {
        clothes: true,
        user: true,
        category: true,
      },
    });
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    const outfit = await prisma.outfit.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(outfit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.outfit.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Outfit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
