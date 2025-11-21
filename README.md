 Proyecto Backend - OutfitChecked
Tecnologías utilizadas
- Node.js con Express**
- Prisma ORM para la gestión de la base de datos
- SQLite como base de datos
- Nodemon para desarrollo


sstructura del proyecto
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

cómo ejecutar el proyecto

para clonar el repositorio:

   git clone https://github.com/Yarimetca/backend-outfits.git
   cd backend-outfits
   
intalar dependencia:

npm install 


ejecutar Prisma Studio (para ver la base de datos):

npx prisma studio 

paea iniciar el servidor:

npm run dev 

Se ejecutará en : http://localhost:4001

luego haz clic en el botón verde que dice Confirmar cambios (o Commit changes)  y
`README.md` se mostrará automáticamente al inicio del repositorio


el código está en la carpeta src, la base de datos en prisma, y el archivo server.js arranca el servidor

abrir una consola y poner:

git clone https://github.com/Yarimetca/backend-outfits.git
cd backend-outfits
npm install
npm start

así se podrá correr el proyecto 


si Prisma marca error

probar:

npx prisma generate
npx prisma studio


y si no abre, revisar si el Prisma está instalado globalmente:

npm install prisma --save-dev

si de plano no…
entra a la carpeta prisma/schema.prisma y revisa si todo está igual al mío, ahorita pongo la foto

