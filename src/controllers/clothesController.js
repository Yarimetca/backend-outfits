import prisma from "../prisma/client.js";

export const createClothes = async (req, res) => {
  try {
    const { name, categoryId, userId } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const clothes = await prisma.clothes.create({
      data: {
        name,
        image,
        categoryId: Number(categoryId),
        userId: Number(userId),
        category: { connect: { id: Number(categoryId) } },
        user: { connect: { id: Number(userId) } }
      }
    });

    res.json(clothes);
  } catch (err) {
    console.error("❌ Error en createClothes:", err);
    res.status(500).json({ message: "Error creando prenda" });
  }
};
