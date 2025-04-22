const perfilUsuarioService = require("../services/perfilUsuarioService")

const crearPerfilUsuario = async (req, res) => {
    const { nId01Usuario, nId02Perfiles } = req.body; // Ahora esperamos un arreglo de idPerfiles
  
    try {
      if (!Array.isArray(nId02Perfiles)) {
        return res.status(400).send({
          status: "Error",
          message: "El campo 'idPerfiles' debe ser un arreglo de IDs de perfiles.",
        });
      }
  
      const resultado = await perfilUsuarioService.asignarPerfilesUsuario(nId01Usuario, nId02Perfiles);
      
      res.status(201).send({
        status: "Ok",
        message: "Asignación de perfiles procesada exitosamente",
        data: resultado,
      });
    } catch (error) {
      // Si el error es por algún detalle específico
      if (error.message) {
        return res.status(400).send({
          status: "Error",
          message: error.message,
        });
      } else {
        // Manejo de otros tipos de errores
        return res.status(500).send({
          status: "Error",
          message: "Error inesperado al procesar las asignaciones de perfiles.",
          details: error.message,
        });
      }
    }
  };
  
  module.exports = {
    crearPerfilUsuario,
  };
  