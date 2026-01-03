import prisma from "../prisma/client.js";

export const getRecommendation = async (req, res) => {
  try {
    const userId = Number(req.user?.id);

    const clothes = await prisma.clothes.findMany({
      where: { userId },
      include: { category: true },
    });

    if (!clothes.length) {
      return res.status(400).json({ message: "No tienes prendas registradas" });
    }

    // Normalizamos nombres
    const normalize = (text) => text.toLowerCase().trim();

    const tops = clothes.filter(c =>
      ["camisas", "playeras", "blusas", "tops"].includes(
        normalize(c.category.name)
      )
    );

    const bottoms = clothes.filter(c =>
      ["pantalones", "faldas", "shorts", "pants"].includes(
        normalize(c.category.name)
      )
    );

    const shoes = clothes.filter(c =>
      ["zapatos", "tenis", "zapatillas"].includes(
        normalize(c.category.name)
      )
    );

    if (!tops.length || !bottoms.length || !shoes.length) {
      return res.status(400).json({
        message: "Faltan prendas para crear un outfit",
        detalle: {
          tops: tops.length,
          bottoms: bottoms.length,
          shoes: shoes.length,
        },
      });
    }

    const outfit = {
      top: tops[Math.floor(Math.random() * tops.length)],
      bottom: bottoms[Math.floor(Math.random() * bottoms.length)],
      shoes: shoes[Math.floor(Math.random() * shoes.length)],
    };

    res.json(outfit);
  } catch (error) {
    console.error("ERROR OUTFIT:", error);
    res.status(500).json({ error: "Error generando outfit" });
  }
};
