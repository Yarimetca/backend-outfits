 Proyecto Backend - OutfitChecked
Tecnologías utilizadas
- Node.js con Express**
- Prisma ORM para la gestión de la base de datos
- SQLite como base de datos
- Nodemon para desarrollo


Estructura del proyecto
── prisma/
│ ├── schema.prisma # Definición del modelo de base de datos
│ ├── migrations/ # Migraciones automáticas
│ └── seed.js # Datos iniciales (semillas)
│
├── src/
│ ├── controllers/ # Controladores de la API
│ ├── routes/ # Rutas del servidor
│ └── index.js # Archivo principal del servidor
│
├── package.json
└── README.md 

Cómo ejecutar el proyecto
1. Clonar el repositorio:
   git clone https://github.com/Yarimetca/backend-outfits.git
   cd backend-outfits
   
intalar dependencia
npm install 

Ejecutar Prisma Studio (para ver la base de datos):
npx prisma studio 

Iniciar el servidor:
npm run dev 

Se ejecutará en : http://localhost:4001

Luego haz clic en el botón verde que dice Confirmar cambios (o Commit changes)  y
`README.md` se mostrará automáticamente al inicio del repositorio

