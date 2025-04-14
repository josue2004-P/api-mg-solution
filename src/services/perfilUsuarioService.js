const { getPrisma } = require("../database/prisma");

const prisma = getPrisma(); 

const nuevoPerfilUsuario = async (nId01Usuario,nId02Perfil) => {

    let perfilPorUsuario = await prisma.BP_04_PERFIL_USUARIO.findFirst({
        where: {
          AND: [
            { nId01Usuario: nId01Usuario },
            { nId02Perfil: nId02Perfil },
          ],
        },
      });
    
    if (perfilPorUsuario) {
      throw new Error("La asignación ya está registrado.");
    }

    // Crear el usuario en la base de datos
    const nuevoPerfilUsuario = await prisma.BP_04_PERFIL_USUARIO.create({
        data: {
            nId01Usuario: nId01Usuario,
            nId02Perfil: nId02Perfil,
        },
    });

    return {
        perfilUsuario: {
            nId01Usuario: nuevoPerfilUsuario.nId01Usuario,
            nId02Perfil: nuevoPerfilUsuario.nId02Perfil
        }
    };
}

module.exports = {
    nuevoPerfilUsuario
}