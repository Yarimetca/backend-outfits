import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const crearUsuario = async (req, res) => {
  const { nombre, email, password, genero } = req.body;
  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, email, password, genero },
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};
