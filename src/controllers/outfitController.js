import prisma from "../prisma/client.js";

export const createOutfit = async (req, res) => {
  try {
    const { name, userId, clothesIds } = req.body;
    const outfit = await prisma.outfit.create({
      data: {
        name,
        userId: Number(userId),
        clothes: {
          connect: (clothesIds || []).map(id => ({ id: Number(id) }))
        }
      },
      include: { clothes: true }
    });
    res.json(outfit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creando outfit" });
  }
};

export const getOutfits = async (req, res) => {
  try {
    const outfits = await prisma.outfit.findMany({ include: { clothes: true, user: true } });
    res.json(outfits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo outfits" });
  }
};
