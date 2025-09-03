// middlewares/validarCampos.js
const { response } = require("express");
const fs = require("fs");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({
      errores: errors.array(),
    });
  }

  next(); 
};

module.exports = {
  validateFields,
};
