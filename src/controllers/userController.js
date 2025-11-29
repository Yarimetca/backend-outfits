import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.user.create({
      data: { name, email, password, gender },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
};
