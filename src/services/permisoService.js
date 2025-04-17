const { getPrisma } = require("../database/prisma");

const prisma = getPrisma(); 

//CREAR PERMISO
const nuevoPermiso = async (sNombre,sDescripcion) => {

    let permisoPorNombre = await prisma.BP_03_PERMISO.findFirst({
      where: {
        sNombre: sNombre,
      },
    });
    
    if (permisoPorNombre) {
      throw new Error("El permiso ya está registrado.");
    }

    // Crear el usuario en la base de datos
    const nuevoPermiso = await prisma.BP_03_PERMISO.create({
        data: {
            sNombre: sNombre,
            sDescripcion: sDescripcion,
        },
    });

    return {
        permiso: {
            id: nuevoPermiso.nId03Permiso,
            nombre: nuevoPermiso.sNombre
        }
    };
}

//OBTENER TODOS LOS PERMISOS
const obtenerPermisos = async () => {

  const permisos = await prisma.BP_03_PERMISO.findMany();

  if (!permisos || permisos.length == 0) {
    throw new Error('No existen permisos registrados');
  }

  return permisos;
}

//OBTENER PERMISO POR ID
const obtenerPermisoPorId = async (id) => {
  
  const permiso = await prisma.BP_03_PERMISO.findUnique({
    where: {
      nId03Permiso: id,  
    },
  });

  if (!permiso) {
    throw new Error('No existe el permiso');
  }


  return permiso;
}

//EDITAR PERMISO POR ID
const editarPermisoPorId = async (id, data) => {

const permisoExistente = await prisma.BP_03_PERMISO.findUnique({
  where: { nId03Permiso: id },
});

if (!permisoExistente) {
  throw new Error('No existe el permiso');
}

const permisoActualizado = await prisma.BP_03_PERMISO.update({
  where: {
    nId03Permiso: id,
  },
  data,
});

  return permisoActualizado;
}

//ELIMINAR PERMISO POR ID
const eliminarPermisoPorId = async (id) => {
  
  const permisoExistente = await prisma.BP_03_PERMISO.findUnique({
    where: { nId03Permiso: id },
  });
  
  if (!permisoExistente) {
    throw new Error('No existe el permiso');
  }
  
  const permisoEliminado = await prisma.BP_03_PERMISO.delete({
    where: {
      nId03Permiso: id,
    },
  });

  return permisoEliminado;
}

module.exports = {
    nuevoPermiso,
    obtenerPermisos,
    obtenerPermisoPorId,
    editarPermisoPorId,
    eliminarPermisoPorId
}