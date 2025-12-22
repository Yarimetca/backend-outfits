import prisma from "../prisma/client.js";

const NEUTRAL_COLORS = ["white", "black", "gray", "beige"];

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function mostCommon(arr) {
  return arr.sort(
    (a, b) =>
      arr.filter(v => v === a).length -
      arr.filter(v => v === b).length
  ).pop();
}

function colorMatches(colorA, colorB) {
  if (NEUTRAL_COLORS.includes(colorA)) return true;
  if (NEUTRAL_COLORS.includes(colorB)) return true;
  return colorA !== colorB;
}

function buildReason({ style, season, top }) {
  let reasons = [];

  if (NEUTRAL_COLORS.includes(top.color)) {
    reasons.push("Color neutro que combina fácilmente");
  }

  reasons.push(`Estilo ${style}`);
  reasons.push(`Adecuado para ${season}`);

  if (style === "formal") {
    reasons.push("Zapatos cerrados para un look elegante");
  }

  return reasons.join(" + ");
}

export const recommendOutfit = async (req, res) => {
  try {
    const userId = req.user?.id || Number(req.query.userId);

    if (!userId) {
      return res.status(400).json({ error: "userId requerido" });
    }

    const clothes = await prisma.clothes.findMany({
      where: { userId },
      include: { category: true }
    });

    if (clothes.length < 3) {
      return res.status(400).json({
        error: "No hay suficiente ropa"
      });
    }

    const style = mostCommon(clothes.map(c => c.style));
    const season = mostCommon(clothes.map(c => c.season));

    const tops = clothes.filter(c => c.category.name === "top" && c.style === style);
    const bottoms = clothes.filter(c => c.category.name === "bottom" && c.style === style);
    const footwear = clothes.filter(c => c.category.name === "footwear");

    const top = pick(tops);
    const bottom =
      bottoms.find(b => colorMatches(top.color, b.color)) ||
      pick(bottoms);

    const shoes =
      footwear.find(f => f.style === style) ||
      pick(footwear);

    return res.json({
      top,
      bottom,
      footwear: shoes,
      reason: buildReason({ style, season, top })
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando outfit" });
  }
};
