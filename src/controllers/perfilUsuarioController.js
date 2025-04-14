const perfilUsuarioService = require("../services/perfilUsuarioService")

const crearPerfilUsuario = async (req,res) => {

    const {idUsuario,idPerfil} = req.body;

    try {

        const { perfilUsuario } = await perfilUsuarioService.nuevoPerfilUsuario(idUsuario,idPerfil);
        
        res.status(201).send({
            status: "Ok",
            message: "Asignación creado exitosamente",
            data: {
                perfilUsuario,
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
                message: "Error inesperado al crear la asignación",
                message: error.message,

            });
        }
    }
}


module.exports = {
    crearPerfilUsuario,
}