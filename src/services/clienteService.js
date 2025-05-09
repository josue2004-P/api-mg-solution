const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

const prisma = getPrisma();

// OBTENER NOMBRES COMPLETOS
function agregarNombreCompleto(clientes) {
  return clientes.map((cliente) => ({
    ...cliente,
    sNombreCompleto: obtenerNombreCompleto(cliente),
  }));
}

function obtenerNombreCompleto(cliente) {
  return `${cliente.sNombreCliente} ${cliente.sApellidoPaternoCliente} ${cliente.sApellidoMaternoCliente}`;
}

const obtenerClientes = async ({ nNoCuenta06Clientes, page, limit }) => {
  const where = {
    bInactivo: false,
  };

  if (nNoCuenta06Clientes) {
    where.nNoCuenta06Clientes = {
      contains: nNoCuenta06Clientes,
    };
  }

  const skip = (page - 1) * limit;

  const [total, clientesObtenidos] = await Promise.all([
    prisma.bP_06_CLIENTE.count({ where }),
    prisma.bP_06_CLIENTE.findMany({
      where,
      select: {
        nNoCuenta06Clientes: true,
        sNombreCliente: true,
        sApellidoPaternoCliente: true,
        sApellidoMaternoCliente: true,
        bInactivo: true,
        dFechaCreacion: true,
      },
      skip,
      take: limit,
      orderBy: {
        nNoCuenta06Clientes: "asc",
      },
    }),
  ]);

  if (!clientesObtenidos || clientesObtenidos.length == 0) {
    throw new Error("No existen clientes registrados ");
  }

  const clientes = agregarNombreCompleto(clientesObtenidos);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    clientes,
  };
};

const obtenerClientePorId = async (id) => {
  const clienteObtenido = await prisma.bP_06_CLIENTE.findUnique({
    where: {
      nNoCuenta06Clientes: id,
      bInactivo: false,
    },
    select: {
      nNoCuenta06Clientes: true,
      sNombreCliente: true,
      sApellidoPaternoCliente: true,
      sApellidoMaternoCliente: true,
      dFechaCreacion: true,
      bInactivo: true,
    },
  });

  if (!clienteObtenido) {
    throw new Error("No existe el usuario");
  }

  return clienteObtenido;
};

// CREAR CLIENTE
const crearCliente = async (
  nNoCuenta06Clientes,
  sNombreCliente,
  sApellidoPaternoCliente,
  sApellidoMaternoCliente
) => {
  let numeroCuenta = await prisma.bP_06_CLIENTE.findFirst({
    where: {
      nNoCuenta06Clientes: nNoCuenta06Clientes,
    },
  });

  if (numeroCuenta) {
    throw new Error("El numero de cuenta ya está registrado.");
  }

  // Crear el usuario en la base de datos
  const newClient = await prisma.bP_06_CLIENTE.create({
    data: {
      nNoCuenta06Clientes: nNoCuenta06Clientes,
      sNombreCliente: sNombreCliente,
      sApellidoPaternoCliente: sApellidoPaternoCliente,
      sApellidoMaternoCliente: sApellidoMaternoCliente,
    },
    select: {
      nNoCuenta06Clientes: true,
      sNombreCliente: true,
    },
  });

  return {
    newClient,
  };
};

const activarClientePorId = async (id) => {
  const clienteExistente = await prisma.bP_06_CLIENTE.findUnique({
    where: { nNoCuenta06Clientes: id },
  });

  if (!clienteExistente) {
    throw new Error("No existe el cliente");
  }

  const clienteEliminado = await prisma.bP_06_CLIENTE.update({
    where: {
      nNoCuenta06Clientes: id,
    },
    data: {
      bInactivo: false,
    },
    select: {
      sNombreCliente: true,
    },
  });

  return clienteEliminado;
};

const desactivarClientePorId = async (id) => {
  const clienteExistente = await prisma.bP_06_CLIENTE.findUnique({
    where: { nNoCuenta06Clientes: id },
  });

  if (!clienteExistente) {
    throw new Error("No existe el cliente");
  }

  const usuarioEliminado = await prisma.bP_06_CLIENTE.update({
    where: {
      nNoCuenta06Clientes: id,
    },
    data: {
      bInactivo: true,
    },
    select: {
      sNombreCliente: true,
    },
  });

  return usuarioEliminado;
};

//EDITAR USUARIO POR ID
const editarClientePorId = async (id, data) => {
  const clienteExistente = await prisma.bP_06_CLIENTE.findUnique({
    where: { nNoCuenta06Clientes: id },
  });

  if (!clienteExistente) {
    throw new Error("No existe el cliente");
  }

  const clienteActualizado = await prisma.bP_06_CLIENTE.update({
    where: {
      nNoCuenta06Clientes: id,
    },
    data: {
      sNombreCliente: data.sNombreCliente,
      sApellidoPaternoCliente: data.sApellidoPaternoCliente, // Asegúrate de que 'data' tenga ese campo
      sApellidoMaternoCliente: data.sApellidoMaternoCliente,
    },
    select: {
      sNombreCliente: true,
      sApellidoPaternoCliente: true,
      sApellidoMaternoCliente: true,
    },
  });

  return clienteActualizado;
};

const generarExcel = async (data) => {
  // Crear una hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Crear un libro de Excel
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Guardar el archivo temporalmente
  const filePath = "./datos.xlsx";
  XLSX.writeFile(workbook, filePath);

  return filePath;
};

const generarPdf = async (data) => {
  const doc = new PDFDocument();
  const stream = new PassThrough();
  doc.pipe(stream);

  // Título del documento
  doc.fontSize(20).text("Listado de Usuarios", { align: "center" }).moveDown();

  // Estilo de la tabla
  const cellHeight = 30;
  const cols = [
    { title: "Nombre", width: 250 },
    { title: "Edad", width: 100 },
  ];

  let startX = 50;
  let startY = doc.y;

  // Encabezado de la tabla
  cols.forEach((col) => {
    doc.rect(startX, startY, col.width, cellHeight).stroke();
    doc
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(col.title, startX + 5, startY + 10);
    startX += col.width;
  });

  startY += cellHeight;

  // Mostrar los usuarios en la tabla
  data.forEach((user) => {
    startX = 50;
    const valores = [user.Nombre, user.Edad.toString()];

    valores.forEach((text, i) => {
      doc.rect(startX, startY, cols[i].width, cellHeight).stroke();
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(text, startX + 5, startY + 10);
      startX += cols[i].width;
    });

    startY += cellHeight;
  });

  doc.end();
  return stream;
};

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  editarClientePorId,
  desactivarClientePorId,
  activarClientePorId,
  generarExcel,
  generarPdf,
};
