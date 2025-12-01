import prisma from "../prisma/client.js";

export const createClothes = async (req, res) => {
  try {
    const { name, image, categoryId, userId } = req.body;
    const clothes = await prisma.clothes.create({
      data: {
        name,
        image: image || null,
        categoryId: Number(categoryId),
        userId: Number(userId)
      }
    });
    res.json(clothes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creando prenda" });
  }
};

export const getClothes = async (req, res) => {
  try {
    const clothes = await prisma.clothes.findMany({ include: { category: true, user: true } });
    res.json(clothes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo prendas" });
  }
};
