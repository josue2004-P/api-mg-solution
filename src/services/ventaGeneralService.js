const { getPrisma } = require("../database/prisma");

const prisma = getPrisma();

const crearVentaGeneral = async (nNoCuenta06Clientes, datos) => {
  const clienteExiste = await prisma.bP_06_CLIENTE.findUnique({
    where: {
      nNoCuenta06Clientes: nNoCuenta06Clientes,
    },
  });

  if (!clienteExiste) {
    throw new Error(`Cliente con cuenta ${nNoCuenta06Clientes} no existe.`);
  }

  for (const mes in datos) {
    for (const año in datos[mes]) {
      const valorBruto = datos[mes][año];

      // Limpia comas y convierte a número decimal
      const limpio = valorBruto?.toString().replace(/,/g, "");
      const nValue = parseFloat(limpio);

      if (!isNaN(nValue)) {
        const sMonth = mes;
        const nYear = parseInt(año);

        // SI NO EXISTE CREA SI EXISTE EDITA
        await prisma.bP_07_VENTA_GENERAL.upsert({
          where: {
            unique_venta_general: {
              sMonth,
              nYear,
              nNoCuenta06Clientes,
            },
          },
          update: {
            nValue,
          },
          create: {
            sMonth,
            nYear,
            nValue,
            nNoCuenta06Clientes,
          },
        });
      } else {
        console.log(`✖ Valor inválido ignorado: ${valorBruto}`);
      }
    }
  }

  return "✅ Datos guardados o actualizados correctamente.";
};

const obtenerVentaGeneral = async (nNoCuenta06Clientes) => {
  // Trae todos los registros del cliente
  const ventas = await prisma.bP_07_VENTA_GENERAL.findMany({
    where: {
      nNoCuenta06Clientes,
    },
    orderBy: [
      { sMonth: 'asc' },
      { nYear: 'asc' }
    ]
  });

  // Estructura de salida: { ENERO: { 2023: "1000000.75", ... }, ... }
  const resultado = {};

  const meses = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];

  const años = [...new Set(ventas.map(v => v.nYear))]; // detectar años usados

  // Inicializa la estructura con todos los meses y años en blanco
  for (const mes of meses) {
    resultado[mes] = {};
    for (const año of años) {
      resultado[mes][año] = "";
    }
  }

  // Llena con los datos obtenidos
  for (const venta of ventas) {
    const { sMonth, nYear, nValue } = venta;
    if (resultado[sMonth]) {
      resultado[sMonth][nYear] = nValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      });
    }
  }

  return resultado;
};


module.exports = {
  crearVentaGeneral,
  obtenerVentaGeneral,
};
