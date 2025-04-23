const apiExternaService = require("../services/apiExternaService");
const { toInt } = require("../helpers/toInt");

const consultarApiExterna = async (req, res) => {

  try {
    const data = await apiExternaService.consultarApiExterna();

    res.status(201).send({
      status: "Ok",
      message: "Datos obtenidos correctamente",
      data
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
        message: "Error inesperado al obtener los datos",
        message: error.message,
      });
    }
  }
};

module.exports = {
    consultarApiExterna
  };
  