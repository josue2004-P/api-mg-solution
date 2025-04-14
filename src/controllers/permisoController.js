const permisoService = require("../services/permisoService")
const {toInt} = require("../helpers/toInt")

const crearPermiso = async (req,res) => {

    const {sNombre,sDescripcion} = req.body;

    try {

        const { permiso } = await permisoService.nuevoPermiso(sNombre,sDescripcion );
        
        res.status(201).send({
            status: "Ok",
            message: "Permiso creado exitosamente",
            data: {
                permiso,
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
                message: "Error inesperado al crear el permiso",
                message: error.message,

            });
        }
    }
}

const consultarPermisos = async (req,res) => {
    try {

        const permisos = await permisoService.obtenerPermisos();
        
        res.status(201).send({
            status: "Ok",
            message: "Permisos obtenidos correctamente",
            data: {
                permisos,    
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

const consultarPermisoPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id)
        const permiso = await permisoService.obtenerPermisoPorId(id);
        
        res.status(201).send({
            status: "Ok",
            message: "Permiso obtenidos correctamente",
            data: {
                permiso,    
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

const editarPermisoPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id);
        const data = req.body;

        const permiso = await permisoService.editarPermisoPorId(id,data);
        
        res.status(201).send({
            status: "Ok",
            message: "Permiso editado correctamente",
            data: {
                permiso,    
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
                message: "Error inesperado al editadar los permiso",
                message: error.message,

            });
        }
    }
}

const eliminarPermisoPorId = async (req,res) => {
    try {
        const id = toInt(req.params.id)
        const permiso = await permisoService.eliminarPermisoPorId(id);
        
        res.status(201).send({
            status: "Ok",
            message: "Permiso eliminado correctamente",
            data: {
                permiso,    
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
                message: "Error inesperado al eliminar los permiso",
                message: error.message,

            });
        }
    }
}


module.exports = {
    crearPermiso,
    consultarPermisos,
    consultarPermisoPorId,
    eliminarPermisoPorId,
    editarPermisoPorId
}