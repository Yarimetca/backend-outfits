import prisma from "../prisma/client.js";

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      include: { clothes: true, outfits: { include: { clothes: true } } }
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo usuario" });
  }
};
