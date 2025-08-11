// middlewares/login.auth.validacion.js
const { body } = require("express-validator");
const {validateFields} = require("./validate.fields");

const createPermissionValidation = [
      body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El nombre debe tener al menos 4 caracteres."),
      body("description")
        .notEmpty()
        .withMessage("La descripción es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("La descripción debe tener al menos 10 caracteres."),
  validateFields,
];

const updatePermissionValidation = [
      body("description")
        .notEmpty()
        .withMessage("La descripción es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("La descripción debe tener al menos 10 caracteres."),
  validateFields,
];

module.exports = {
  createPermissionValidation,
  updatePermissionValidation
}

