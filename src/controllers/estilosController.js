
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerEstilos = async (req, res) => {
  try {
    const estilos = await prisma.estilo.findMany({
      include: { usuario: true }, 
    });
    res.json(estilos);
  } catch (err) {
    console.error("Error al obtener estilos:", err);
    res.status(500).json({ error: "Error al obtener estilos" });
  }
};

export const obtenerEstiloPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const estilo = await prisma.estilo.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true },
    });
    if (!estilo) return res.status(404).json({ error: "Estilo no encontrado" });
    res.json(estilo);
  } catch (err) {
    console.error("Error al obtener estilo:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const crearEstilo = async (req, res) => {
  try {
    const { nombre, descripcion, usuarioId } = req.body || {};
    if (!nombre || !usuarioId) {
      return res.status(400).json({ error: "Faltan campos requeridos (nombre, usuarioId)" });
    }

    const nuevoEstilo = await prisma.estilo.create({
      data: { nombre, descripcion, usuarioId: parseInt(usuarioId) },
    });

    res.status(201).json(nuevoEstilo);
  } catch (err) {
    console.error("Error al crear estilo:", err);
    res.status(500).json({ error: "Error al crear estilo" });
  }
};


export const actualizarEstilo = async (req, res) => {
  const { id } = req.params;
  try {
    const estiloActualizado = await prisma.estilo.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(estiloActualizado);
  } catch (err) {
    console.error("Error al actualizar estilo:", err);
    res.status(404).json({ error: "Estilo no encontrado" });
  }
};

export const eliminarEstilo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estilo.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: "Estilo eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar estilo:", err);
    res.status(404).json({ error: "Estilo no encontrado" });
  }
};
