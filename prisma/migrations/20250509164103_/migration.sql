/*
  Warnings:

  - You are about to alter the column `nValue` on the `BP_07_VENTA_GENERAL` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `BP_07_VENTA_GENERAL` MODIFY `nValue` DOUBLE NOT NULL;
