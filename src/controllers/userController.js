import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      include: {
        outfits: true,
        clothes: true,
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const usuario = await prisma.user.create({
      data: req.body,
    });
    res.json({ message: "Usuario creado correctamente.", usuario });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json({ message: "Usuario actualizado correctamente.", usuario });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
};
