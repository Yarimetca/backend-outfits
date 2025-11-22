import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerPrendas = async (req, res) => {
  const prendas = await prisma.prenda.findMany();
  res.json(prendas);
};

export const obtenerPrendaPorId = async (req, res) => {
  const { id } = req.params;
  const prenda = await prisma.prenda.findUnique({
    where: { id: parseInt(id) }
  });
  if (!prenda) return res.status(404).json({ error: "Prenda no encontrada" });
  res.json(prenda);
};

export const crearPrenda = async (req, res) => {
  const { nombre, tipo, color, usuarioId } = req.body;
  const nueva = await prisma.prenda.create({
    data: { nombre, tipo, color, usuarioId },
  });
  res.json(nueva);
};

export const actualizarPrenda = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, color } = req.body;
  const actualizada = await prisma.prenda.update({
    where: { id: parseInt(id) },
    data: { nombre, tipo, color },
  });
  res.json(actualizada);
};

export const eliminarPrenda = async (req, res) => {
  const { id } = req.params;
  await prisma.prenda.delete({
    where: { id: parseInt(id) },
  });
  res.json({ mensaje: "Prenda eliminada" });
};
