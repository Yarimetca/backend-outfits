import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../prisma/client.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getRecommendation = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { style, season } = req.query;

    // 1. Buscamos TODA la ropa del usuario para que la IA la conozca
    const allClothes = await prisma.clothes.findMany({
      where: { userId: Number(userId) }
    });

    if (allClothes.length === 0) {
      return res.status(404).json({ error: "No tienes ropa en tu armario aún." });
    }

    // 2. Preparamos la lista para Gemini (solo IDs, nombres y categorías)
    const clothesList = allClothes.map(c => 
      `ID: ${c.id}, Categoría: ${c.categoryId}, Nombre: ${c.name}, Color: ${c.color}, Estilo: ${c.style}`
    ).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// En outfitController.js
const prompt = `
  Eres un estilista personal inteligente. Tengo esta ropa en mi armario:
  ${clothesList}

  Ocasión: "${style}"
  Clima: "${season}"

  INSTRUCCIONES DE EMERGENCIA:
  1. Debes elegir obligatoriamente un ID para cada categoría: Superior (Categoría 1), Inferior (Categoría 2) y Calzado (Categoría 3, 4 o 5).
  2. Si no hay ropa que coincida exactamente con "${style}", ¡NO TE RINDAS! Elige las prendas que mejor combinen de lo que tengo disponible.
  3. No respondas con errores. Siempre devuelve un outfit completo.

  Responde solo JSON:
  {
    "topId": número_id_real,
    "bottomId": número_id_real,
    "shoesId": número_id_real,
    "description": "explicación de por qué este look funciona"
  }
`;

    const result = await model.generateContent(prompt);
    const responseIA = JSON.parse(result.response.text());

    // 3. Buscamos los objetos completos para enviárselos a Android
    const top = allClothes.find(c => c.id === responseIA.topId);
    const bottom = allClothes.find(c => c.id === responseIA.bottomId);
    const shoes = allClothes.find(c => c.id === responseIA.shoesId);

    res.json({
      top,
      bottom,
      shoes,
      description: responseIA.description
    });

  } catch (err) {
    console.error("GEMINI ERROR:", err);
    res.status(500).json({ error: "La IA tuvo un problema al elegir tu outfit" });
  }
};
