const { getPrisma } = require("../database/prisma");
const { toInt } = require("../helpers/toInt");

const prisma = getPrisma();

//SERVICE CREATE PROFILE
const createProfile = async (name, description) => {
  let profileByName = await prisma.profiles.findFirst({
    where: {
      name: name,
    },
  });

  if (profileByName) {
    throw new Error("El perfil ya está registrado.");
  }

  const newProfile = await prisma.profiles.create({
    data: {
      name: name,
      description: description,
    },
  });

  return {
    id: newProfile.id,
    name: newProfile.name,
  };
};

//SERVICE GET ALL PROFILES
const getAllProfiles = async ({ name, page, limit }) => {
  const where = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const skip = (page - 1) * limit;

  const [total, profiles] = await Promise.all([
    prisma.profiles.count({ where }),
    prisma.profiles.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  if (!profiles || profiles.length === 0) {
    throw new Error("No existen perfiles registrados");
  }

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    profiles: profiles,
  };
};

//SERVICE GET PROFILE BY ID
const getProfileById = async (id) => {
  const profile = await prisma.profiles.findUnique({
    where: {
      id: toInt(id),
    },
  });

  if (!profile) {
    throw new Error("No existe el perfil con ese Id");
  }
  return profile;
};

//SERVICE UPDATE PROFILE BY ID
const updateProfileById = async (id, data) => {
  const existingProfile = await prisma.profiles.findUnique({
    where: { id: id },
  });

  if (!existingProfile) {
    throw new Error("No existe el perfil");
  }

  const profileUpdated = await prisma.profiles.update({
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

  return profileUpdated;
};

//SERVICE DELETE PROFILE BY ID
const deleteProfileById = async (id) => {
  const existingProfile = await prisma.profiles.findUnique({
    where: { id: id },
  });

  if (!existingProfile) {
    throw new Error("No existe el perfil");
  }

  const perfilDeleted = await prisma.profiles.delete({
    where: {
      id: id,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return perfilDeleted;
};

//SERVICE ASSING PERMISSION
const assingPermission = async (permissionId, profileId) => {
  let profileByPermission = await prisma.profile_permissions.findFirst({
    where: {
      AND: [{ permission_id: permissionId }, { profile_id: profileId }],
    },
  });

  if (profileByPermission) {
    throw new Error("La asignación ya está registrado.");
  }

  const newAssignment = await prisma.profile_permissions.create({
    data: {
      permission_id: permissionId,
      profile_id: profileId,
    },
  });

  return {
    assignmentPermission: {
      permission_id: newAssignment.permission_id,
      profile_id: newAssignment.profile_id,
    },
  };
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  assingPermission,
};
