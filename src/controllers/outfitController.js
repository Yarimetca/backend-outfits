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

    const prompt = `
      Eres un experto en moda. Tengo la siguiente ropa:
      ${clothesList}

      Crea un outfit para la ocasión "${style}" y clima "${season}".
      Debes elegir un ID de categoría 1 (top), uno de categoría 2 (bottom) y uno de categoría 3 (shoes).
      
      Responde ÚNICAMENTE en formato JSON:
      {
        "topId": número_del_id,
        "bottomId": número_del_id,
        "shoesId": número_del_id,
        "description": "explicación de por qué combina"
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