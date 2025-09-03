const { body } = require("express-validator");
const { validateFields } = require("./validate.fields");

const createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 4 })
    .withMessage("El nombre debe tener al menos 4 caracteres."),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres."),

  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio.")
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número mayor a 0."),

  body("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio.")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0."),

  body("categoryId")
    .notEmpty()
    .withMessage("La categoría es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La categoría debe ser un ID válido."),

  body("brandId")
    .notEmpty()
    .withMessage("La marca es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La marca debe ser un ID válido."),

  body("userCreateId")
    .notEmpty()
    .withMessage("El usuario creador es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El usuario creador debe ser un ID válido."),

  validateFields,
];

const updateProductValidation = [
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatorio.")
    .isLength({ min: 4 })
    .withMessage("La descripción debe tener al menos 10 caracteres."),
  validateFields,
];

module.exports = {
  createProductValidation,
  updateProductValidation,
};
