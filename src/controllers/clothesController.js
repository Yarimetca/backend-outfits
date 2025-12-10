import prisma from "../prisma/client.js";

export const createClothes = async (req, res) => {
  try {
    const { name, categoryId, userId } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const clothes = await prisma.clothes.create({
  data: {
    name,
    type,
    color,
    image,
    category: {
      connect: { id: Number(categoryId) }
    },
    user: {
      connect: { id: Number(userId) }
    }
  }
})


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
