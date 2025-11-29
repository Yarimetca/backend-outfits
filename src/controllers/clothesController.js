import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.create({
      data: req.body,
    });
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.findMany();
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const clothes = await prisma.clothes.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.clothes.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Clothes deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
