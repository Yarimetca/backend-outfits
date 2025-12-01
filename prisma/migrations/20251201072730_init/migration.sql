/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Outfit` table. All the data in the column will be lost.
  - The primary key for the `_ClothesToOutfit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ClothesToOutfit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Outfit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Clothes" DROP CONSTRAINT "Clothes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Outfit" DROP CONSTRAINT "Outfit_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Outfit" DROP CONSTRAINT "Outfit_userId_fkey";

-- AlterTable
ALTER TABLE "Clothes" ADD COLUMN     "image" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Outfit" DROP COLUMN "categoryId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "_ClothesToOutfit" DROP CONSTRAINT "_ClothesToOutfit_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_ClothesToOutfit_AB_unique" ON "_ClothesToOutfit"("A", "B");

-- AddForeignKey
ALTER TABLE "Clothes" ADD CONSTRAINT "Clothes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfit" ADD CONSTRAINT "Outfit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
