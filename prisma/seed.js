import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");


  await prisma.outfit.deleteMany();
  await prisma.clothes.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Adriana",
      email: "adriana_seed@gmail.com",
      password: "1234",
      gender: "female",
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Casual",
    },
  });


  const clothes = await prisma.clothes.create({
    data: {
      name: "White Shirt",
      color: "white",
      imageUrl: "https://image.com/shirt.jpg",
      userId: user.id,
      categoryId: category.id,
    },
  });

  await prisma.outfit.create({
    data: {
      name: "Daily Look",
      description: "White shirt with blue jeans",
      userId: user.id,
      categoryId: category.id,
      clothes: {
        connect: [{ id: clothes.id }], // Outfit contains clothes
      },
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch(err => {
    console.error("Seeding error:", err);
  })
  .finally(() => prisma.$disconnect());
