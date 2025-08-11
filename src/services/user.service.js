const { getPrisma } = require("../database/prisma");
const { addFullName } = require("../helpers/user.helpers");

const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const prisma = getPrisma();

// SERVICE CREATE USER
const createUser = async ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  // SEARCH EMAIL REGISTERED
  const userByEmail = await prisma.users.findFirst({
    where: { email },
  });

  if (userByEmail) {
    throw new Error("The email is already registered.");
  }

  // SEARCH USERNAME REGISTERED
  const userByUsername = await prisma.users.findFirst({
    where: { username },
  });

  if (userByUsername) {
    throw new Error("The username is already registered.");
  }

  // ENCRYPT PASSWORD
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  // CREATE NEW USER IN THE DATABASE
  const newUser = await prisma.users.create({
    data: {
      first_name,
      last_name,
      username,
      email,
      password: passwordHash,
      created_at: new Date(),
    },
    select: {
      first_name: true,
      email: true,
    },
  });

  return {
    newUser,
  };
};

// SERVICE GET ALL USERS
const getAllUsers = async ({ first_name, page, limit }) => {
  const where = {
    is_active: true,
  };

  if (first_name) {
    where.first_name = {
      contains: first_name,
    };
  }

  const skip = (page - 1) * limit;

  const [total, getAllUsers] = await Promise.all([
    prisma.users.count({ where }),
    prisma.users.findMany({
      where,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        is_active: true,
        created_at: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  if (!getAllUsers || getAllUsers.length == 0) {
    throw new Error("No existen usuarios registrados ");
  }

  const users = addFullName(getAllUsers);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    users,
  };
};

//SERVICE GET USER BY ID
const getUserById = async (id) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      id: id,
      is_active: true,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      is_active: true,
      created_at: true,
    },
  });

  if (!existingUser) {
    throw new Error("No existe el usuario");
  }

  return existingUser;
};

//SERVICE UPDATE USER BY ID
const updateUserById = async (id, data) => {
  const existingUser = await prisma.users.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new Error("No existe el usuario");
  }

  if (data.password && data.password.trim() !== "") {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(data.password, salt);
  } else {
    delete data.password;
  }

  const userUpdated = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    },
    select: {
      first_name: true,
      last_name: true,
    },
  });

  return userUpdated;
};

// SERVICE ACTIVATE USER BY ID
const activateUserById = async (id) => {
  const existingUser = await prisma.users.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new Error("No existe el usuario");
  }

  const userActivated = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      is_active: true,
    },
    select: {
      first_name: true,
    },
  });

  return userActivated;
};

// SERVICE DEACTIVATE USER BY ID
const deactivateUserById = async (id) => {
  const existingUser = await prisma.users.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new Error("No existe el usuario");
  }

  const userDisabled = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      is_active: false,
    },
    select: {
      first_name: true,
    },
  });

  return userDisabled;
};

// SERVICE ASSING PROFILE TO THE USER
const assingProfileToTheUser = async (userId, profilesIds) => {
  const asignados = [];
  const omitidos = [];

  // Get the relationships of the profiles
  const existingProfiles = await prisma.user_profile.findMany({
    where: {
      user_id: userId,
    },
  });

  const existingProfilesId = existingProfiles.map(
    (profile) => profile.profile_id
  );

  // Remove relationships that are no longer in the new array
  const profilesToBeDelete = existingProfilesId.filter(
    (id) => !profilesIds.includes(id)
  );

  // Remove relationships that are not in the new profile array
  if (profilesToBeDelete.length > 0) {
    await prisma.user_profile.deleteMany({
      where: {
        user_id: userId,
        profile_id: {
          in: profilesToBeDelete,
        },
      },
    });
  }

  // 3. Assign the new profiles
  for (const profile_id of profilesIds) {
    const existingProfile = await prisma.user_profile.findFirst({
      where: {
        AND: [{ user_id: userId }, { profile_id: profile_id }],
      },
    });

    if (existingProfile) {
      omitidos.push(profile_id);
      continue;
    }

    // If it doesn't exist, we create it
    const newAssignment = await prisma.user_profile.create({
      data: {
        user_id: userId,
        profile_id,
      },
    });

    // Add to the list of assignees
    asignados.push(newAssignment);
  }

  return {
    asignados,
    omitidos,
    total: {
      solicitados: profilesIds.length,
      asignados: asignados.length,
      omitidos: omitidos.length,
      eliminados: profilesToBeDelete.length,
    },
  };
};

// SERVICE GET PROFILES BY USER ID
const getProfilesByUserId = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!user || user.length == 0) {
    throw new Error("No existe el usuario");
  }

  const profiles = await prisma.user_profile.findMany({
    where: {
      user_id: id,
    },
    select: {
      profile_id: true,
      user_id: true,
      profiles: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!profiles || profiles.length == 0) {
    return "Sin perfiles asignados";
  }

  return profiles;
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  activateUserById,
  deactivateUserById,
  assingProfileToTheUser,
  getProfilesByUserId,
};
