import prisma from "../prisma/client.js";

const NEUTRAL_COLORS = ["white", "black", "gray", "beige", "cream"];

const pickRandom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const colorMatches = (a, b) => {
  if (!a || !b) return true;
  if (NEUTRAL_COLORS.includes(a)) return true;
  if (NEUTRAL_COLORS.includes(b)) return true;
  return a !== b;
};

const buildReason = ({ style, season, top, bottom, footwear }) => {
  let reasons = [];

  if (NEUTRAL_COLORS.includes(top.color)) {
    reasons.push("Color neutro fácil de combinar");
  }

  reasons.push(`Estilo ${style}`);
  reasons.push(`Ideal para ${season}`);

  return reasons.join(" · ");
};

export const recommendOutfit = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { style, season } = req.query;

    if (!userId || !style || !season) {
      return res.status(400).json({
        error: "style y season son obligatorios"
      });
    }

    // 🔥 TOP 10 POR CATEGORÍA
    const tops = await prisma.clothes.findMany({
      where: {
        userId,
        categoryId: 1,
        style,
        season,
        image: { not: null }
      },
      take: 10
    });

    const bottoms = await prisma.clothes.findMany({
      where: {
        userId,
        categoryId: 2,
        style,
        season,
        image: { not: null }
      },
      take: 10
    });

    const footwear = await prisma.clothes.findMany({
      where: {
        userId,
        categoryId: 3,
        style,
        season,
        image: { not: null }
      },
      take: 10
    });

    if (!tops.length || !bottoms.length || !footwear.length) {
      return res.status(400).json({
        error: "No hay suficientes prendas para este outfit"
      });
    }

    const top = pickRandom(tops);

    const bottom =
      bottoms.find(b => colorMatches(top.color, b.color)) ||
      pickRandom(bottoms);

    const shoes =
      footwear.find(f => colorMatches(bottom.color, f.color)) ||
      pickRandom(footwear);

    return res.json({
      top,
      bottom,
      footwear: shoes,
      reason: buildReason({ style, season, top, bottom, footwear: shoes })
    });

  } catch (err) {
    console.error("OUTFIT ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
