/*
  Warnings:

  - Added the required column `sUsuarioImg` to the `BP_01_USUARIO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BP_01_USUARIO` ADD COLUMN `sUsuarioImg` VARCHAR(191) NOT NULL;
