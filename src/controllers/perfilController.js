const perfilService = require("../services/perfilService")
const {toInt} = require("../helpers/toInt")

const crearPerfil = async (req,res) => {

    const {sNombre,sDescripcion} = req.body;

    try {

        const { perfil } = await perfilService.nuevoPerfil(sNombre,sDescripcion);
        
        res.status(201).send({
            status: "Ok",
            message: "Perfil creado exitosamente",
            data: {
                perfil,
            },
        });
    } catch (error) {
        // Si el error es por correo ya registrado
        if (error.message) {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            // Manejo de otros tipos de errores
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al crear el perfil",
                message: error.message,

            });
        }
    }
}

const consultarPerfiles = async (req,res) => {
    try {

        const perfiles = await perfilService.obtenerPerfiles();
        
        res.status(201).send({
            status: "Ok",
            message: "Perfiles obtenidos correctamente",
            data:perfiles,
        });

    } catch (error) {
        if (error.message) {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al obtener los perfiles",
                message: error.message,

            });
        }
    }
}

const consultarPerfilPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id)
        const perfil = await perfilService.obtenerPerfilPorId(id);
        
        res.status(201).send({
            status: "Ok",
            message: "Perfil obtenido correctamente",
            data: {
                perfil,    
            },
        });

    } catch (error) {
        if (error.message) {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al obtener los permiso",
                message: error.message,

            });
        }
    }
}

const editarPerfilPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id);
        const data = req.body;

        const perfil = await perfilService.editarPerfilPorId(id,data);
        
        res.status(201).send({
            status: "Ok",
            message: "Perfil editado correctamente",
            data: {
                perfil,    
            },
        });

    } catch (error) {
        if (error.message) {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al editadar el perfil",
                message: error.message,

            });
        }
    }
}

const eliminarPerfilPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id)
        const perfil = await perfilService.eliminarPerfilPorId(id);
        
        res.status(201).send({
            status: "Ok",
            message: "Perfil eliminado correctamente",
            data: {
                perfil,    
            },
        });

    } catch (error) {
        if (error.message) {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al eliminar el perfil",
                message: error.message,

            });
        }
    }
}


module.exports = {
    crearPerfil,
    consultarPerfiles,
    consultarPerfilPorId,
    eliminarPerfilPorId,
    editarPerfilPorId
}