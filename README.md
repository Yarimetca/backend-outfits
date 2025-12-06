BASE DE DATOS
CARRERA MORELOS YARIMET MONSERRAT 
2024050185
5IV12
Ob2dit


A mí me tocó hacer toda la parte del backend y la base de datos.
En donde el celular necesita para guardar usuarios, ropa, categorías y toda la información configuré la base de datos en PostgreSQL desde Render e hice las tablas principales:

Users: donde se guardan los registros, correos, contraseñas encriptadas, etc
Categories: tipos de ropa
Clothes: la ropa que sube cada usuario.
También dejé listas las relaciones (cada usuario puede tener muchas prendas)
Configuré VS para conectar el backend con la base de datos
Hice el schema.prisma, generé migraciones y corregí errores cuando Render fallaba
Armé el backend con Node.js + Express.
Y me encargué de:
- Crear todas las rutas
- Hacer los controladores
- Conectar todo con Prisma
- Manejar JWT para logins
- Encriptar contraseñas con bcrypt
  
Hice los endpoints que usa la app de Android:
POST/register: registrar usuarios
POST/login: iniciar sesión
POST /api/clothes: subir prendas
GET/api/clothes/:userId: obtener prendas de un usuario
GET/api/categories: obtener categorías
Todo eso lo probé en Postman y lo dejé bien

Subí todo a Render, configuré las variables de entorno (DATABASE_URL, JWT_SECRET, PORT) y 
dejé el backend en línea para que la app se pueda conectar



¿Qué se logró?
Dejar la base de datos completa y 
crear tablas y relaciones sin errores con
el backend que se conectara sin errores, tambien 
tener todo más organizado para que el proyecto no se hiciera más complicado

¿Qué se podría mejorar?
Explicar mejor la estructura para que el equipo la entienda más rápido, 
meter validaciones extra para evitar datos raros y 
optimizar cosas si el proyecto crece más adelante

Aprendizajes del equipo:
Que si no nos ponemos de acuerdo, nada corre
todo se conecta y dependemos de todo lo que hagan los demás, como un complemento y 
que explicar lo que hacemos ayuda para que el equipo avance más rápido

Referencias: 
https://render.com/docs/render-dashboard https://code.visualstudio.com/docs/getstarted/userinterface      
https://www.youtube.com/watch?v=CbyVItXf6Lw                        
https://www.youtube.com/watch?v=yWxBUcG_C7g&t=414s  
https://www.youtube.com/watch?v=A2VoUyZZMCw 
https://www.youtube.com/watch?v=DWhGIqmVG_Y 
https://www.youtube.com/watch?v=aihrJszjPhk 
https://www.youtube.com/watch?v=bymb332fdKc&list=PLDbrnXa6SAzUsLG1gjECgFYLSZDov09fO&index=6 
https://www.youtube.com/watch?v=qsejysrhJiU
chat.gpt.com










 

 Proyecto Backend - OutfitChecked
Tecnologías utilizadas
- Node.js con Express**
- Prisma ORM para la gestión de la base de datos
- SQLite como base de datos
- Nodemon para desarrollo
- postman


para clonar el repositorio:
   git clone https://github.com/Yarimetca/backend-outfits.git
   cd backend-outfits
intalar dependencia:
npm install 
ejecutar Prisma Studio (para ver la base de datos):
npx prisma studio 
para iniciar el servidor:
npm run dev 
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

