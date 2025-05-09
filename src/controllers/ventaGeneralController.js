const ventaGeneralService = require("../services/ventaGeneralService");
const { toInt } = require("../helpers/toInt");

const crearVentaGeneral = async (req, res) => {

  const {nNoCuenta06Clientes,datos} = req.body

  try {
    const data = await ventaGeneralService.crearVentaGeneral(nNoCuenta06Clientes,datos);

    res.status(201).send({
      status: "Ok",
      message: "Creación de venta general procesada exitosamente",
      data,
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
        message: "Error inesperado al procesar la creación de venta general",
        details: error.message,
      });
    }
  }
};

const obtenerVentaGeneral = async (req, res) => {
  const id = toInt(req.params.id);
  try { 
    const data = await ventaGeneralService.obtenerVentaGeneral(id);

    res.status(201).send({
      status: "Ok",
      message: "Obtener venta general exitosamente",
      data,
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
        message: "Error inesperado al procesar la obtencon de la venta general.",
        details: error.message,
      });
    }
  }
};

module.exports = {
  crearVentaGeneral,
  obtenerVentaGeneral,
};
