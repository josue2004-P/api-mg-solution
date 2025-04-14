const usuarioService = require("../services/usuarioService")

const obtenerUsuarios = async (req,res) => {

    const allUsuarios = await usuarioService.obtenerUsuarios()

    res.send({
        status: 'Ok',
        data: allUsuarios
    })
}

module.exports = {
    obtenerUsuarios,
}