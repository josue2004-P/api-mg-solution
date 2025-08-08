const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");

const prisma = getPrisma();

const crearUsuario = async ({
  nombre,
  apellido,
  nombre_usuario,
  correo_electronico,
  contrasena_hash,
}) => {
  // Verificar si ya existe usuario con correo electrónico
  const usuarioPorEmail = await prisma.usuarios.findFirst({
    where: { correo_electronico },
  });

  if (usuarioPorEmail) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  // Verificar si ya existe usuario con nombre de usuario
  const usuarioPorUsuario = await prisma.usuarios.findFirst({
    where: { nombre_usuario },
  });

  if (usuarioPorUsuario) {
    throw new Error("El nombre de usuario ya está registrado.");
  }

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(contrasena_hash, salt);

  // Crear usuario en la base de datos
  const newUser = await prisma.usuarios.create({
    data: {
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      contrasena_hash: passwordHash,
    },
  });

  // Generar JWT
  const token = await generarJWT(newUser.id, newUser.nombre_usuario);

  return {
    user: newUser,
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
  crearUsuario,
  revalidarToken,
  loginUsuario,
};
