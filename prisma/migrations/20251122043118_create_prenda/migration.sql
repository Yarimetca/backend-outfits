/*
  Warnings:

  - You are about to drop the column `outfitId` on the `Prenda` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_OutfitPrenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OutfitPrenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Outfit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OutfitPrenda_B_fkey" FOREIGN KEY ("B") REFERENCES "Prenda" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "color" TEXT,
    "imagen" TEXT,
    "usuarioId" INTEGER,
    "estiloId" INTEGER,
    CONSTRAINT "Prenda_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Prenda_estiloId_fkey" FOREIGN KEY ("estiloId") REFERENCES "Estilo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Prenda" ("color", "id", "nombre", "usuarioId") SELECT "color", "id", "nombre", "usuarioId" FROM "Prenda";
DROP TABLE "Prenda";
ALTER TABLE "new_Prenda" RENAME TO "Prenda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_OutfitPrenda_AB_unique" ON "_OutfitPrenda"("A", "B");

-- CreateIndex
CREATE INDEX "_OutfitPrenda_B_index" ON "_OutfitPrenda"("B");
