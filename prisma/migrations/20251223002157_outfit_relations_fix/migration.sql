/*
  Warnings:

  - You are about to drop the `_ClothesToOutfit` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `color` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `style` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `season` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ClothesToOutfit" DROP CONSTRAINT "_ClothesToOutfit_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClothesToOutfit" DROP CONSTRAINT "_ClothesToOutfit_B_fkey";

-- AlterTable
ALTER TABLE "Clothes" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "style" SET NOT NULL,
ALTER COLUMN "season" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "_ClothesToOutfit";

-- CreateTable
CREATE TABLE "OutfitClothes" (
    "outfitId" INTEGER NOT NULL,
    "clothesId" INTEGER NOT NULL,

    CONSTRAINT "OutfitClothes_pkey" PRIMARY KEY ("outfitId","clothesId")
);

-- AddForeignKey
ALTER TABLE "OutfitClothes" ADD CONSTRAINT "OutfitClothes_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitClothes" ADD CONSTRAINT "OutfitClothes_clothesId_fkey" FOREIGN KEY ("clothesId") REFERENCES "Clothes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
