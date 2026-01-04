import prisma from "../prisma/client.js";

const NEUTRAL_COLORS = ["black", "white", "gray", "beige", "denim", "neutral"];

async function findCloth({ categoryId, style, season }) {
  // 1️⃣ match perfecto
  let cloth = await prisma.clothes.findFirst({
    where: {
      categoryId,
      style,
      season
    },
    include: { category: true }
  });

  if (cloth) return cloth;

  // 2️⃣ mismo style, cualquier season
  cloth = await prisma.clothes.findFirst({
    where: {
      categoryId,
      style
    },
    include: { category: true }
  });

  if (cloth) return cloth;

  // 3️⃣ neutro
  cloth = await prisma.clothes.findFirst({
    where: {
      categoryId,
      color: { in: NEUTRAL_COLORS }
    },
    include: { category: true }
  });

  if (cloth) return cloth;

  // 4️⃣ cualquiera de la categoría
  cloth = await prisma.clothes.findFirst({
    where: { categoryId },
    include: { category: true }
  });

  return cloth;
}

export const getRecommendation = async (req, res) => {
  try {
    const { style = "casual", season = "todas" } = req.query;

    const top = await findCloth({ categoryId: 1, style, season });
    const bottom = await findCloth({ categoryId: 2, style, season });
    const shoes = await findCloth({ categoryId: 3, style, season });

    if (!top || !bottom || !shoes) {
      return res.status(404).json({
        message: "No hay prendas suficientes para armar outfit"
      });
    }

    res.json({
      outfit: {
        top,
        bottom,
        shoes
      }
    });

  } catch (error) {
    console.error("OUTFIT ERROR:", error);
    res.status(500).json({ message: "Error generando outfit" });
  }
};
