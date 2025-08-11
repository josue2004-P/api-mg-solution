const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");
const { toInt } = require("../helpers/toInt");

const prisma = getPrisma();

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
  });
  // GENERATE JWT
  const token = await generateJWT(newUser.id, newUser.username);

  return {
    newUser,
    token,
  };
};

const revalidateToken = async (tokenObtained) => {
  // AGREGAR SERVICIO
  const { uid, name } = jwt.verify(tokenObtained, process.env.SECRET_JWT_SEED);

  const user = await prisma.users.findFirst({
    where: {
      id: uid,
      is_active: true,
    },
    include: {
      user_profiles: {
        include: {
          profiles: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  const token = await generateJWT(uid, name);

  const profilesNames = user.user_profiles.map((item) => item.profiles.name);

  return {
    uid: user.id,
    profile: profilesNames,
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
      is_active: true,
    },
    include: {
      user_profiles: {
        include: {
          profiles: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("The user does not exist with that email address");
  }

  // Confirmar los passwords
  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    throw new Error("Incorrect password");
  }

  const token = await generateJWT(user.id, user.username);

  const profilesNames = user.user_profiles.map((item) => item.profiles.name);

  return {
    uid: user.id,
    profiles: profilesNames,
    token,
  };
};

module.exports = {
  createUser,
  revalidateToken,
  loginUser,
};
