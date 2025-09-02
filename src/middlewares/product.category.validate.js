const { body } = require("express-validator");
const {validateFields} = require("./validate.fields");

const createProductCategoryValidation = [
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

const updateProductCategoryValidation = [
      body("description")
        .notEmpty()
        .withMessage("La descripción es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("La descripción debe tener al menos 10 caracteres."),
  validateFields,
];

module.exports = {
  createProductCategoryValidation,
  updateProductCategoryValidation
}

