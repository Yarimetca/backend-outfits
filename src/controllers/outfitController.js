import prisma from "../prisma/client.js";

const NEUTRAL_COLORS = ["black", "white", "gray", "beige", "denim"];

async function findCloth({ userId, categoryId, style, season }) {
  // 1️⃣ match perfecto
  let cloth = await prisma.clothes.findFirst({
    where: {
      userId,
      categoryId,
      style,
      season
    },
    include: { category: true }
  });
  if (cloth) return cloth;

  // 2️⃣ mismo estilo
  cloth = await prisma.clothes.findFirst({
    where: {
      userId,
      categoryId,
      style
    },
    include: { category: true }
  });
  if (cloth) return cloth;

  // 3️⃣ color neutro
  cloth = await prisma.clothes.findFirst({
    where: {
      userId,
      categoryId,
      color: { in: NEUTRAL_COLORS }
    },
    include: { category: true }
  });
  if (cloth) return cloth;

  // 4️⃣ cualquiera del usuario
  return prisma.clothes.findFirst({
    where: {
      userId,
      categoryId
    },
    include: { category: true }
  });
}

export const getRecommendation = async (req, res) => {
  try {
    const { style = "casual", season = "verano" } = req.query;
    const userId = req.user.id; // 🔐 USUARIO LOGUEADO

    const top = await findCloth({ userId, categoryId: 1, style, season });
    const bottom = await findCloth({ userId, categoryId: 2, style, season });
    const shoes = await findCloth({ userId, categoryId: 3, style, season });

    if (!top || !bottom || !shoes) {
      return res.status(404).json({
        message: "No tienes suficientes prendas para esta ocasión"
      });
    }

    res.json({
      outfit: { top, bottom, shoes }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando outfit" });
  }
};
