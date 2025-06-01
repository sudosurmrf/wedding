/*
  Warnings:

  - You are about to drop the column `dresscode` on the `Info` table. All the data in the column will be lost.
  - You are about to drop the column `ourstory` on the `Info` table. All the data in the column will be lost.
  - Added the required column `dressCode` to the `Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ourStory` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Info" DROP COLUMN "dresscode",
DROP COLUMN "ourstory",
ADD COLUMN     "dressCode" TEXT NOT NULL,
ADD COLUMN     "ourStory" TEXT NOT NULL;
