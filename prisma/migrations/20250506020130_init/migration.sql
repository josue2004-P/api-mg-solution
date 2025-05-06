/*
  Warnings:

  - You are about to drop the column `bActivo` on the `BP_01_USUARIO` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BP_01_USUARIO` DROP COLUMN `bActivo`,
    ADD COLUMN `bInactivo` BOOLEAN NOT NULL DEFAULT false;
