const { getPrisma } = require("../database/prisma");
const { toInt } = require("../helpers/toInt");

const prisma = getPrisma();

//SERVICE CREATE PRODUCT CATEGORY
const createProductCategory = async (name, description) => {
  let nameRecord = await prisma.product_category.findFirst({
    where: {
      name: name,
    },
  });

  if (nameRecord) {
    throw new Error("El dato ya está registrado.");
  }

  const newRecord = await prisma.product_category.create({
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

//SERVICE GET ALL PRODUCT CATEGORY
const getAllProductCategory = async ({ name, page, limit }) => {
  const where = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const skip = (page - 1) * limit;

  const [total, records] = await Promise.all([
    prisma.product_category.count({ where }),
    prisma.product_category.findMany({
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

//SERVICE GET PRODUCT CATEGORY  BY ID
const getProductCategoryById = async (id) => {
  const record = await prisma.product_category.findUnique({
    where: {
      id: toInt(id),
    },
  });

  if (!record) {
    throw new Error("No existe el registro con ese Id");
  }
  return record;
};

//SERVICE UPDATE PRODUCT CATEGORY  BY ID
const updateProductCategoryById = async (id, data) => {
  const existsRecord = await prisma.product_category.findUnique({
    where: { id: id },
  });

  if (!existsRecord) {
    throw new Error("No existe el registro");
  }

  const recordUpdated = await prisma.product_category.update({
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

//SERVICE DELETE PRODUCT CATEGORY  BY ID
const deleteProductCategoryById = async (id) => {
  const existingRecord = await prisma.product_category.findUnique({
    where: { id: id },
  });

  if (!existingRecord) {
    throw new Error("No existe el registro");
  }

  const recordDeleted = await prisma.product_category.delete({
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
  createProductCategory,
  getAllProductCategory,
  getProductCategoryById,
  updateProductCategoryById,
  deleteProductCategoryById,
};
