-- CreateTable
CREATE TABLE `BP_06_CLIENTE` (
    `nNoCuenta06Clientes` INTEGER NOT NULL AUTO_INCREMENT,
    `sNombreCliente` VARCHAR(191) NOT NULL,
    `sApellidoPaternoCliente` VARCHAR(191) NOT NULL,
    `sApellidoMaternoCliente` VARCHAR(191) NOT NULL,
    `dFechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`nNoCuenta06Clientes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BP_07_VENTA_GENERAL` (
    `nIdVentaGeneral07VentaGeneral` INTEGER NOT NULL AUTO_INCREMENT,
    `sMonth` VARCHAR(191) NOT NULL,
    `nYear` INTEGER NOT NULL,
    `nValue` INTEGER NOT NULL,
    `nNoCuenta06Clientes` INTEGER NOT NULL,

    PRIMARY KEY (`nIdVentaGeneral07VentaGeneral`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BP_07_VENTA_GENERAL` ADD CONSTRAINT `BP_07_VENTA_GENERAL_nNoCuenta06Clientes_fkey` FOREIGN KEY (`nNoCuenta06Clientes`) REFERENCES `BP_06_CLIENTE`(`nNoCuenta06Clientes`) ON DELETE RESTRICT ON UPDATE CASCADE;
