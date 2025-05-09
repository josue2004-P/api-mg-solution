/*
  Warnings:

  - A unique constraint covering the columns `[sMonth,nYear,nNoCuenta06Clientes]` on the table `BP_07_VENTA_GENERAL` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BP_07_VENTA_GENERAL_sMonth_nYear_nNoCuenta06Clientes_key` ON `BP_07_VENTA_GENERAL`(`sMonth`, `nYear`, `nNoCuenta06Clientes`);
