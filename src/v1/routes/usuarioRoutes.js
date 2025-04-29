const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/usuarioController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const { validarPermiso } = require("../../middlewares/validar-permiso");
const uploadImage = require("../../middlewares/uploadImageMiddleware");
const { body } = require("express-validator");
const { validarCampos } = require("../../middlewares/validar-campos");

// MIDLEWARE PERMISOS
// validarPermiso('USUARIOS', 'nLeer')

router
  .get(
    "/",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    usuarioController.obtenerUsuarios
  )
  .post(
    "/",
    validarJWT,
    uploadImage.single("usuarioImagen"),
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
    validarPerfil(["ADMINISTRADOR"]),
    usuarioController.crearUsuario
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    usuarioController.obtenerUsuarioPorId
  )
  .put(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    usuarioController.editarUsuarioPorId
  )
  .delete(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    usuarioController.eliminarUsuarioPorId
  );

module.exports = router;
