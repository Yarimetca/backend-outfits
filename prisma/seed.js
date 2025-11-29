import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando carga de datos...");

  await prisma.outfit.deleteMany();
  await prisma.clothes.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const usuario = await prisma.user.create({
    data: {
      name: "Adriana",
      email: "adriana_seed@gmail.com",
      password: "1234",
      gender: "female"
    }
  });

  const categoria = await prisma.category.create({
    data: {
      name: "Casual"
    }
  });

  const prenda = await prisma.clothes.create({
    data: {
      name: "Camisa Blanca",
      color: "blanco",
      imageUrl: "https://image.com/shirt.jpg",
      userId: usuario.id,
      categoryId: categoria.id
    }
  });

  await prisma.outfit.create({
    data: {
      name: "Conjunto Diario",
      description: "Camisa blanca con jeans azules",
      userId: usuario.id,
      categoryId: categoria.id,
      clothes: {
        connect: [{ id: prenda.id }]
      }
    }
  });

  console.log("Carga de datos completada.");
}

main()
  .catch((error) => {
    console.error("Error durante la carga de datos:", error);
  })
  .finally(() => prisma.$disconnect());
