export const getRecommendation = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const clothes = await prisma.clothes.findMany({
      where: { userId },
      include: { category: true },
    });

    if (!clothes.length) {
      return res.status(400).json({ message: "No hay prendas" });
    }

    const tops = clothes.filter(c =>
      c.category.name.toLowerCase() === "top"
    );

    const bottoms = clothes.filter(c =>
      c.category.name.toLowerCase() === "bottom"
    );

    const shoes = clothes.filter(c =>
      c.category.name.toLowerCase() === "footwear"
    );

    if (!tops.length || !bottoms.length || !shoes.length) {
      return res.status(400).json({
        message: "Faltan prendas para crear un outfit",
        detalle: {
          tops: tops.length,
          bottoms: bottoms.length,
          shoes: shoes.length
        }
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
