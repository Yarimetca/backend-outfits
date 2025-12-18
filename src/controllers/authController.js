import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password, genero } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const exists = await prisma.usuario.findUnique({
      where: { email },
    });

    if (exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashed,
        genero,
      },
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      nombre: newUser.nombre,
    });
  } catch (error) {
    console.error("ERROR REGISTER:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
