import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { nombre, name, email, password } = req.body;
    const finalName = nombre || name;

    if (!finalName || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

  
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: finalName,
        email,
        password: hashed,
      },
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error("ERROR REGISTER:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
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
