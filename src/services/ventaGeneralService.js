const { getPrisma } = require("../database/prisma");

const prisma = getPrisma();

const crearVentaGeneral = async () => {

  return "chido";
};

const obtenerPerfilesPorIdUsuario = async(id) =>{

  const usuario = await prisma.bP_01_USUARIO.findUnique({
    where:{
      nId01Usuario:id
    }
  })

  if(!usuario || usuario.length==0){
    throw new Error("No existe el usuario");
  }

  const perfiles = await prisma.bP_04_PERFIL_USUARIO.findMany({
    where:{
      nId01Usuario: id
    },
    select:{
      nId04PerfilUsuario:true,
      nId01Usuario:true,
      nId02Perfil:true,
      perfil: {
        select:{
          sNombre:true
        }
      }
    }
  })

  if(!perfiles || perfiles.length==0){
    return ("Sin perfiles asignados");
  }

  return perfiles;
};

module.exports = {
  crearVentaGeneral,
  obtenerPerfilesPorIdUsuario
};
