const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");

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
    where: { first_name },
  });

  if (userByUsername) {
    throw new Error("The username is already registered.");
  }

  // ENCRYPT PASSWORD
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  // CREATE NEW USER IN THE DATABASE
  const newUser = await prisma.usuarios.create({
    data: {
      first_name,
      last_name,
      username,
      email,
      password: passwordHash,
    },
  });

  // GENERATE JWT
  const token = await generarJWT(newUser.id, newUser.nombre_usuario);

  return {
    newUser,
    token,
  };
};

const revalidarToken = async (tokenObtenido) => {
  // AGREGAR SERVICIO
  const { uid, nombre } = jwt.verify(
    tokenObtenido,
    process.env.SECRET_JWT_SEED
  );

  const usuario = await prisma.BP_01_USUARIO.findFirst({
    where: {
      nId01Usuario: uid,
    },
    include: {
      perfilesUsuario: {
        include: {
          perfil: {
            select: {
              sNombre: true,
              sDescripcion: true, // Puedes agregar más campos si lo necesitas
            },
          },
        },
      },
    },
  });

  const token = await generarJWT(uid, nombre);

  const perfilNombres = usuario.perfilesUsuario.map(
    (item) => item.perfil.sNombre
  );

  return {
    uid: usuario.nId01Usuario,
    perfil: perfilNombres, // Aquí tienes solo los nombres de los perfiles
    token,
  };
};

const loginUsuario = async (sEmail, sPassword) => {
  const usuario = await prisma.BP_01_USUARIO.findFirst({
    where: {
      sEmail: sEmail,
      bInactivo: false,
    },
    include: {
      perfilesUsuario: {
        include: {
          perfil: {
            select: {
              sNombre: true,
              sDescripcion: true, // Puedes agregar más campos si lo necesitas
            },
          },
        },
      },
    },
  });

  if (!usuario) {
    throw new Error("El usuario no existe con ese email");
  }
  // Confirmar los passwords
  const validPassword = bcrypt.compareSync(sPassword, usuario.sPassword);

  if (!validPassword) {
    throw new Error("Contraseña incorrecto");
  }

  const token = await generarJWT(usuario.nId01Usuario, usuario.sName);

  const perfilNombres = usuario.perfilesUsuario.map(
    (item) => item.perfil.sNombre
  );

  return {
    uid: usuario.nId01Usuario,
    perfil: perfilNombres, // Aquí tienes solo los nombres de los perfiles
    token,
  };
};
module.exports = {
  createUser,
  revalidarToken,
  loginUsuario,
};
