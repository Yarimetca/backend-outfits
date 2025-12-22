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
    const userId = req.user?.id || Number(req.query.userId) || 1;

    const clothes = await prisma.clothes.findMany({
      where: { userId }
    });

    // Filtrado SEGURO por categoryId
    const tops = clothes.filter(c => c.categoryId === 1);
    const bottoms = clothes.filter(c => c.categoryId === 2);
    const footwear = clothes.filter(c => c.categoryId === 3);

    if (!tops.length || !bottoms.length || !footwear.length) {
      return res.status(400).json({
        error: "Faltan prendas para generar outfit"
      });
    }

    const style = mostCommon(clothes.map(c => c.style));
    const season = mostCommon(clothes.map(c => c.season));

    const validTops = tops.filter(t => t.style === style);
    const validBottoms = bottoms.filter(b => b.style === style);
    const validFootwear = footwear.filter(f => f.style === style);

    const top = pick(validTops.length ? validTops : tops);

    const bottom =
      (validBottoms.find(b => colorMatches(top.color, b.color))) ||
      pick(validBottoms.length ? validBottoms : bottoms);

    const shoes =
      pick(validFootwear.length ? validFootwear : footwear);

    return res.json({
      top,
      bottom,
      footwear: shoes,
      reason: buildReason({ style, season, top })
    });

  } catch (error) {
    console.error("RECOMMEND ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
