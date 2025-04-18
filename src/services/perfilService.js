const { getPrisma } = require("../database/prisma");

const prisma = getPrisma();

const nuevoPerfil = async (sNombre, sDescripcion) => {
  let perfilPorNombre = await prisma.BP_02_PERFIL.findFirst({
    where: {
      sNombre: sNombre,
    },
  });

  if (perfilPorNombre) {
    throw new Error("El perfil ya está registrado.");
  }

  // Crear el usuario en la base de datos
  const nuevoPerfil = await prisma.BP_02_PERFIL.create({
    data: {
      sNombre: sNombre,
      sDescripcion: sDescripcion,
    },
  });

  return {
    id: nuevoPerfil.nId02Perfil,
    nombre: nuevoPerfil.sNombre,
  };
};

//OBTENER TODOS LOS PERMISOS
const obtenerPerfiles = async () => {
  const perfiles = await prisma.BP_02_PERFIL.findMany();

  if (!perfiles || perfiles.length == 0) {
    throw new Error("No existen perfiles registrados");
  }

  return perfiles;
};

//OBTENER PERMISO POR ID
const obtenerPerfilPorId = async (id) => {
  const perfil = await prisma.BP_02_PERFIL.findUnique({
    where: {
      nId02Perfil: id,
    },
  });

  if (!perfil) {
    throw new Error("No existe el perfil con ese Id");
  }

  return perfil;
};

//EDITAR PERMISO POR ID
const editarPerfilPorId = async (id, data) => {
  const perfilExistente = await prisma.BP_02_PERFIL.findUnique({
    where: { nId02Perfil: id },
  });

  if (!perfilExistente) {
    throw new Error("No existe el perfil");
  }

  const perfilActualizado = await prisma.BP_02_PERFIL.update({
    where: {
      nId02Perfil: id,
    },
    data: {
      sDescripcion: data.sDescripcion, // Asegúrate de que 'data' tenga ese campo
    },
    select: {
      sNombre: true,
      sDescripcion: true,
    },
  });

  return perfilActualizado;
};

//ELIMINAR PERMISO POR ID
const eliminarPerfilPorId = async (id) => {
  const perfilExistente = await prisma.BP_02_PERFIL.findUnique({
    where: { nId02Perfil: id },
  });

  if (!perfilExistente) {
    throw new Error("No existe el perfil");
  }

  const perfilEliminado = await prisma.BP_02_PERFIL.delete({
    where: {
      nId02Perfil: id,
    },
    select: {
      sNombre: true,
      sDescripcion: true,
    },
  });

  return perfilEliminado;
};

module.exports = {
  nuevoPerfil,
  obtenerPerfiles,
  obtenerPerfilPorId,
  editarPerfilPorId,
  eliminarPerfilPorId,
};
