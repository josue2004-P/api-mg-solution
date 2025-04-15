const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");


const prisma = getPrisma(); 

const obtenerUsuarios = async () =>{

    const usuarios = await prisma.BP_01_USUARIO.findMany();
    return usuarios;
}

//OBTENER PERMISO POR ID
const obtenerUsuarioPorId = async (id) => {
  
  const usuario = await prisma.bP_01_USUARIO.findUnique({
    where: {
      nId01Usuario: id,  
    },
  });

  if (!usuario) {
    throw new Error('No existe el usuario');
  }

  return usuario;
}

const obtenerPerfilUsuario = async (id) =>{

    const usuario = await prisma.BP_01_USUARIO.findFirst({
        where: {
          nId01Usuario: id,
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

      const perfilNombres = usuario.perfilesUsuario.map(item => item.perfil.sNombre);

      return {
        perfil : perfilNombres
      }
}

const obtenerPermisosUsuario = async (id) => {
  // Obtener el perfil del usuario
  const perfil = await prisma.BP_04_PERFIL_USUARIO.findFirst({
    where: {
      nId01Usuario: id,
    },
  });

  if (!perfil) return [];

  // Obtener todos los permisos asociados al perfil
  const permisos = await prisma.bP_05_PERFIL_PERMISO.findMany({
    where: {
      nId02Perfil: perfil.nId02Perfil,
    },
    include: {
      permiso: true, // esto incluye los datos del permiso desde la tabla relacionada
    },
  });

  // Retornar una lista de permisos ya lista para validar
  return permisos.map(p => ({
    sModulo: p.permiso.sNombre,
    nLeer: p.nLeer,
    nCrear: p.nCrear,
    nEditar: p.nEditar,
    nBorrar: p.nBorrar,
  }));
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerPerfilUsuario,
    obtenerPermisosUsuario
}