const { getPrisma } = require("../database/prisma");

const prisma = getPrisma();

//SERVICE CREATE PERMISSION
const createPermission = async (name, description) => {
  let permissionByName = await prisma.permissions.findFirst({
    where: {
      name: name,
    },
  });

  if (permissionByName) {
    throw new Error("El permiso ya está registrado.");
  }

  const newPermission = await prisma.permissions.create({
    data: {
      name: name,
      description: description,
    },
  });

  return {
    id: newPermission.id,
    name: newPermission.name,
  };
};

//SERVICE GET ALL PERMISSION
const getAllPermissions = async ({ name, page, limit }) => {
  const where = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const skip = (page - 1) * limit;

  const [total, permissions] = await Promise.all([
    prisma.permissions.count({ where }),
    prisma.permissions.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  if (!permissions || permissions.length == 0) {
    throw new Error("No hay permisos registrados ");
  }

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    permissions,
  };
};

// SERVICE GET PERMISSION BY ID
const getPermissionById = async (id) => {
  const permission = await prisma.permissions.findUnique({
    where: {
      id: id,
    },
  });

  if (!permission) {
    throw new Error("No existe el permiso");
  }

  return permission;
};

//SERVICE UPDATE PERMISSION BY ID
const updatePermissionById = async (id, data) => {
  const existingPermission = await prisma.permissions.findUnique({
    where: { id: id },
  });

  if (!existingPermission) {
    throw new Error("No existe el permiso");
  }

  const permissionUpdated = await prisma.permissions.update({
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

  return permissionUpdated;
};

//SERVICE DELETE PERMISSION BY ID
const deletePermissionById = async (id) => {
  const existingPermission = await prisma.permissions.findUnique({
    where: { id: id },
  });

  if (!existingPermission) {
    throw new Error("No existe el permiso");
  }

  const permissionDeleted = await prisma.permissions.delete({
    where: {
      id: id,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return permissionDeleted;
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
