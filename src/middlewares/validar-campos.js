// middlewares/validarCampos.js
const { response } = require("express");

const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }

  next(); // Si no hay errores, sigue al siguiente middleware o controlador
};

module.exports = {
  validarCampos,
};
