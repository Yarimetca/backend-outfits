import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Insertando datos de ejemplo...");

  await prisma.outfit.deleteMany();
  await prisma.prenda.deleteMany();
  await prisma.estilo.deleteMany();
  await prisma.usuario.deleteMany();

  const usuario = await prisma.usuario.create({
    data: {
      nombre: "Adriana",
      email: "adriana_seed@gmail.com",
      password: "1234",
      genero: "femenino",
    },
  });

  const estilo = await prisma.estilo.create({
    data: {
      nombre: "Casual",
      descripcion: "Ropa cómoda y relajada",
      usuarioId: usuario.id,
    },
  });

  const prenda = await prisma.prenda.create({
    data: {
      nombre: "Camisa blanca",
      tipo: "camisa",
      color: "blanco",
      usuarioId: usuario.id,
    },
  });

  await prisma.outfit.create({
    data: {
      nombre: "Look diario",
      descripcion: "Camisa blanca + jeans azules",
      usuarioId: usuario.id,
      estiloId: estilo.id,
    },
  });

  console.log("Datos insertados correctamente.");
}

main()
  .catch((err) => {
    console.error("❌ Error en el seed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
