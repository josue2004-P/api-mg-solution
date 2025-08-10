// middlewares/login.auth.validacion.js
const { body } = require("express-validator");
const {validateFields} = require("./validate.fields");

const createAuthValidacion = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters."),
  body("last_name")
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters."),
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is invalid."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  validateFields,
];

const loginAuthValidacion = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid if provided."),
  body("password")
    .notEmpty()
    .withMessage("Password is required."),
  validateFields,
];

module.exports = {
  createAuthValidacion,
  loginAuthValidacion
}

