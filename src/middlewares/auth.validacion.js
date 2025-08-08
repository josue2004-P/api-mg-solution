// middlewares/login.auth.validacion.js
const { body } = require("express-validator");
const {validarCampos} = require("./validar-campos"); // ajusta la ruta si es necesario

const crearAuthValidacion = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 4 })
    .withMessage("El nombre debe tener al menos 4 caracteres."),
  body("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 4 })
    .withMessage("El apellido debe tener al menos 4 caracteres."),
  body("nombre_usuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 4 })
    .withMessage("El nombre de usuario debe tener al menos 4 caracteres."),
  body("correo_electronico")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("El correo electrónico no es válido."),
  body("contrasena_hash")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  validarCampos,
];

const loginAuthValidacion = [
  body("correo_electronico")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("El correo electrónico no es válido."),
  body("contrasena_hash")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  validarCampos,
];

module.exports = {
  crearAuthValidacion,
  loginAuthValidacion
}

