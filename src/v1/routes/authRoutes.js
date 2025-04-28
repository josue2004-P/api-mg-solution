const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarCampos } = require("../../middlewares/validar-campos");

const { body } = require("express-validator");

router
  .post(
    "/",
    [
      body("sEmail")
        .notEmpty()
        .withMessage("El email es obligatorio.")
        .isEmail()
        .withMessage("El email no es valido."),
      body("sPassword")
        .notEmpty()
        .withMessage("La contraseña es obligatoria.")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),
      validarCampos,
    ],
    authController.loginUsuario
  )
  .post(
    "/new",
    [
      body("sNombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El nombre debe tener al menos 4 caracteres."),
      body("sApellidoPaterno")
        .notEmpty()
        .withMessage("El apellido paterno es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El apellido paterno debe tener al menos 4 caracteres."),
      body("sApellidoMaterno")
        .notEmpty()
        .withMessage("El apellido materno es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El apellido materno debe tener al menos 4 caracteres."),
      body("sUsuario")
        .notEmpty()
        .withMessage("El usuario es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El apellido materno debe tener al menos 4 caracteres."),
      body("sEmail")
        .notEmpty()
        .withMessage("El email es obligatorio.")
        .isEmail()
        .withMessage("El email no es valido."),
      body("sPassword")
        .notEmpty()
        .withMessage("La contraseña es obligatoria.")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),
      validarCampos,
    ],
    authController.crearUsuario
  )
  .get("/renew", validarJWT, authController.revalidarToken);

module.exports = router;
