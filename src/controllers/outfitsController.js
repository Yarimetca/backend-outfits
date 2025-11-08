import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerOutfits = async (req, res) => {
  try {
    const outfits = await prisma.outfit.findMany({
      include: { usuario: true, estilo: true },
    });
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los outfits" });
  }
};

export const crearOutfit = async (req, res) => {
  try {
    const { nombre, descripcion, imagenUrl, usuarioId, estiloId } = req.body;

    if (!nombre || !usuarioId || !estiloId) {
      return res.status(400).json({
        error: "Faltan campos obligatorios: nombre, usuarioId o estiloId",
      });
    }

    const nuevoOutfit = await prisma.outfit.create({
      data: { nombre, descripcion, imagenUrl, usuarioId, estiloId },
    });

    res.json(nuevoOutfit);
  } catch (error) {
    console.error("Error detallado al crear outfit:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ error: "Error al crear el outfit" });
  }
};

export const actualizarOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, imagenUrl, estiloId } = req.body;

    const outfitActualizado = await prisma.outfit.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, imagenUrl, estiloId },
    });

    res.json(outfitActualizado);
  } catch (error) {
    console.error("Error al actualizar outfit:", error.message);
    res.status(500).json({ error: "Error al actualizar el outfit" });
  }
};

export const eliminarOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.outfit.delete({ where: { id: Number(id) } });
    res.json({ mensaje: "Outfit eliminado" });
  } catch (error) {
    console.error("Error al eliminar outfit:", error.message);
    res.status(500).json({ error: "Error al eliminar el outfit" });
  }
};

