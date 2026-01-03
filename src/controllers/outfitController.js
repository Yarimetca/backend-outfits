import prisma from "../prisma/client.js";

export const getRecommendation = async (req, res) => {
  try {
    const userId = Number(req.user?.id);

    const clothes = await prisma.clothes.findMany({
      where: { userId },
      include: { category: true },
    });

    if (clothes.length === 0) {
      return res.status(400).json({ message: "No hay prendas" });
    }

    const tops = clothes.filter(c =>
      ["Camisas", "Playeras", "Blusas"].includes(c.category.name)
    );

    const bottoms = clothes.filter(c =>
      ["Pantalones", "Faldas"].includes(c.category.name)
    );

    const shoes = clothes.filter(c =>
      ["Zapatos", "Tenis"].includes(c.category.name)
    );

    if (!tops.length || !bottoms.length || !shoes.length) {
      return res.status(400).json({
        message: "No hay suficientes prendas para un outfit",
      });
    }

    const outfit = {
      top: tops[Math.floor(Math.random() * tops.length)],
      bottom: bottoms[Math.floor(Math.random() * bottoms.length)],
      shoes: shoes[Math.floor(Math.random() * shoes.length)],
    };

    res.json({ outfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando outfit" });
  }
};
