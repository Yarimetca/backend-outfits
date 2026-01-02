import prisma from "../prisma/client.js";

const NEUTRAL_COLORS = ["white", "black", "gray", "beige", "cream"];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const colorMatches = (a, b) => {
  if (!a || !b) return true;
  if (NEUTRAL_COLORS.includes(a.toLowerCase())) return true;
  if (NEUTRAL_COLORS.includes(b.toLowerCase())) return true;
  return a.toLowerCase() !== b.toLowerCase();
};

export const getRecommendation = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { style, season } = req.query;

    if (!userId || !style || !season) {
      return res.status(400).json({ error: "style y season son obligatorios" });
    }

    // Buscamos las prendas REALES en la base de datos
    const tops = await prisma.clothes.findMany({
      where: { userId: Number(userId), categoryId: 1, style, season }
    });

    const bottoms = await prisma.clothes.findMany({
      where: { userId: Number(userId), categoryId: 2, style, season }
    });

    const footwear = await prisma.clothes.findMany({
      where: { userId: Number(userId), categoryId: 3, style, season }
    });

    if (tops.length === 0 || bottoms.length === 0 || footwear.length === 0) {
      return res.status(404).json({ error: "No tienes suficiente ropa de este estilo/temporada para combinar." });
    }

    // Elegimos prendas que SI existen
    const top = pickRandom(tops);
    const bottom = bottoms.find(b => colorMatches(top.color, b.color)) || pickRandom(bottoms);
    const shoes = footwear.find(f => colorMatches(bottom.color, f.color)) || pickRandom(footwear);

    // Mandamos el objeto COMPLETO. Android recibirá top.id real.
    res.json({
      top,
      bottom,
      shoes, // Lo cambié a 'shoes' para que coincida con tu Android
      description: `Outfit ${style} para ${season}. Combinación basada en colores ${top.color} y ${bottom.color}.`
    });

  } catch (err) {
    console.error("OUTFIT ERROR:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};