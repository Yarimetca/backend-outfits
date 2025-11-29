import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOutfit = async (req, res) => {
  try {
    const outfit = await prisma.outfit.create({
      data: {
        ...req.body,
        clothes: {
          connect: req.body.clothesIds?.map((id) => ({ id })),
        },
      },
    });

    res.json({ message: "Outfit creado correctamente", outfit });
  } catch (err) {
    res.status(500).json({ error: "Error al crear outfit" });
  }
};

export const getOutfits = async (req, res) => {
  try {
    const outfits = await prisma.outfit.findMany({
      include: {
        user: true,
        category: true,
        clothes: true,
      },
    });
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener outfits" });
  }
};

export const updateOutfit = async (req, res) => {
  try {
    const { id } = req.params;

    const outfit = await prisma.outfit.update({
      where: { id: Number(id) },
      data: {
        ...req.body,
        clothes: req.body.clothesIds
          ? {
              set: req.body.clothesIds.map((c) => ({ id: c })),
            }
          : undefined,
      },
    });

    res.json({ message: "Outfit actualizado", outfit });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar outfit" });
  }
};

export const deleteOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.outfit.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Outfit eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar outfit" });
  }
};
