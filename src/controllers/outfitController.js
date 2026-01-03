import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../prisma/client.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());

export const getRecommendation = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { style, season } = req.query;

    const allClothes = await prisma.clothes.findMany({
      where: { userId: Number(userId) },
    });

    if (allClothes.length < 3) {
      return res.status(400).json({ 
        error: "No tienes suficiente ropa. Sube al menos un Top, un Pantalón y Zapatos." 
      });
    }

    const tops = allClothes.filter(c => c.categoryId === 1);
    const bottoms = allClothes.filter(c => c.categoryId === 2);
    const shoes = allClothes.filter(c => c.categoryId === 3);

    if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
      return res.json({
        top: tops[0] || allClothes[0],
        bottom: bottoms[0] || (allClothes[1] || allClothes[0]),
        shoes: shoes[0] || (allClothes[2] || allClothes[0]),
        description: "Nota: No encontré prendas en todas las categorías requeridas."
      });
    }

    const clothesList = allClothes.map(c => 
      `ID: ${c.id}, Cat: ${c.categoryId}, Nombre: ${c.name}, Estilo: ${c.style}, Color: ${c.color}`
    ).join("\n");

    // CAMBIO VITAL: Usar gemini-1.5-flash
const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash-latest"
});


    const prompt = `
      Eres un experto en moda. Mi armario:
      ${clothesList}
      Selecciona un outfit para: Ocasión "${style}" y Clima "${season}".
      Reglas: 1 Top (cat 1), 1 Bottom (cat 2), 1 Shoes (cat 3).
      Responde SOLO este JSON:
      {
        "topId": número,
        "bottomId": número,
        "shoesId": número,
        "description": "explicación"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    try {
        const responseIA = JSON.parse(text);
        const finalTop = tops.find(c => c.id === responseIA.topId) || tops[0];
        const finalBottom = bottoms.find(c => c.id === responseIA.bottomId) || bottoms[0];
        const finalShoes = shoes.find(c => c.id === responseIA.shoesId) || shoes[0];

        res.json({
            top: finalTop,
            bottom: finalBottom,
            shoes: finalShoes,
            description: responseIA.description || "Outfit generado."
        });
    } catch (parseError) {
        res.json({
            top: tops[0],
            bottom: bottoms[0],
            shoes: shoes[0],
            description: "Combinación sugerida de emergencia."
        });
    }
  } catch (err) {
    console.error("ERROR EN OUTFIT CONTROLLER:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};