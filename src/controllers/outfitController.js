import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../prisma/client.js";

// Configuración de la IA
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getRecommendation = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { style, season } = req.query;

    // 1. Obtener TODA la ropa del usuario
    const allClothes = await prisma.clothes.findMany({
      where: { userId: Number(userId) },
    });

    // 2. Verificación de seguridad: ¿Tiene ropa?
    if (allClothes.length < 3) {
      return res.status(400).json({ 
        error: "No tienes suficiente ropa. Sube al menos un Top, un Pantalón y Zapatos." 
      });
    }

    // 3. Filtrar por categorías para ayudar a la IA
    const tops = allClothes.filter(c => c.categoryId === 1);
    const bottoms = allClothes.filter(c => c.categoryId === 2);
    const shoes = allClothes.filter(c => c.categoryId === 3);
    // --- PLAN DE EMERGENCIA ---
    // Si falta alguna categoría, mandamos lo que sea para que la App no de error
    if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
      console.log("Faltan categorías en la BD. Enviando respuesta de emergencia.");
      return res.json({
        top: tops[0] || allClothes[0],
        bottom: bottoms[0] || (allClothes[1] || allClothes[0]),
        shoes: shoes[0] || (allClothes[2] || allClothes[0]),
        description: "Nota: No encontré prendas en todas las categorías (Top, Bottom, Shoes), así que mezclé lo que encontré."
      });
    }

    // 4. Preparar la lista simplificada para Gemini
    const clothesList = allClothes.map(c => 
      `ID: ${c.id}, Cat: ${c.categoryId}, Nombre: ${c.name}, Estilo: ${c.style}, Color: ${c.color}`
    ).join("\n");

    // 5. Llamar a Gemini
    // Usa este, es el mejor y más rápido
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro"
});


    // ... dentro de outfitController.js
const prompt = `
  Eres un experto en moda. Mi armario es este:
  ${clothesList}

  Instrucciones:
  1. Selecciona un outfit para la ocasión "${style}" y clima "${season}".
  2. Debes elegir obligatoriamente:
     - Un Top (categoryId 1)
     - Un Bottom (categoryId 2)
     - Un Footwear (categoryId 3)
  3. No inventes IDs, usa solo los IDs de la lista proporcionada.

  Responde ÚNICAMENTE en formato JSON plano:
  {
    "topId": número,
    "bottomId": número,
    "shoesId": número,
    "description": "breve explicación"
  }
`;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text().replace(/```json|```/g, "").trim();
    const responseIA = JSON.parse(textResponse);

    // 6. Buscar los objetos completos para enviarlos a Android
   // 6. Buscar los objetos completos
// Usamos el ID de la IA, pero si no lo encuentra, agarramos el primero que haya en esa categoría
const finalTop = tops.find(c => c.id === responseIA.topId) || tops[0];
const finalBottom = bottoms.find(c => c.id === responseIA.bottomId) || bottoms[0];
const finalShoes = shoes.find(c => c.id === responseIA.shoesId) || shoes[0];

res.json({
  top: finalTop,
  bottom: finalBottom,
  shoes: finalShoes,
  description: responseIA.description || "Un outfit perfecto para ti."
});

  } catch (err) {
    console.error("ERROR EN OUTFIT CONTROLLER:", err);
    res.status(500).json({ error: "La IA se mareó un poco, intenta de nuevo." });
  }
};  