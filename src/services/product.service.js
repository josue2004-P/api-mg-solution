const { getPrisma } = require("../database/prisma");
const { toInt } = require("../helpers/toInt");

const prisma = getPrisma();

//SERVICE CREATE PRODUCT 
const createProduct = async (name, description) => {
  let nameRecord = await prisma.product.findFirst({
    where: {
      name: name,
    },
  });

  if (nameRecord) {
    throw new Error("El dato ya está registrado.");
  }

  const newRecord = await prisma.product.create({
    data: {
      name: name,
      description: description,
    },
  });

  return {
    id: newRecord.id,
    name: newRecord.name,
  };
};

//SERVICE GET ALL PRODUCT 
const getAllProduct = async ({ name, page, limit }) => {
  const where = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const skip = (page - 1) * limit;

  const [total, records] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  if (!records || records.length === 0) {
    throw new Error("No existen registros");
  }

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    records,
  };
};

//SERVICE GET PRODUCT BY ID
const getProductById = async (id) => {
  const record = await prisma.product.findUnique({
    where: {
      id: toInt(id),
    },
  });

  if (!record) {
    throw new Error("No existe el registro con ese Id");
  }
  return record;
};

//SERVICE UPDATE PRODUCT BY ID
const updateProductById = async (id, data) => {
  const existsRecord = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!existsRecord) {
    throw new Error("No existe el registro");
  }

  const recordUpdated = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      description: data.description,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return recordUpdated;
};

//SERVICE DELETE PRODUCT BY ID
const deleteProductById = async (id) => {
  const existingRecord = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!existingRecord) {
    throw new Error("No existe el registro");
  }

  const recordDeleted = await prisma.product.delete({
    where: {
      id: id,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return recordDeleted;
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
