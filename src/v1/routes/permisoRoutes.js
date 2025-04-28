const express = require("express");
const router = express.Router();
const permisoController = require("../../controllers/permisoController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const { validarCampos } = require("../../middlewares/validar-campos");

const { body } = require("express-validator");

router
  .post(
    "/",
    validarJWT,
    [
      body("sNombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El nombre debe tener al menos 4 caracteres."),
      body("sDescripcion")
        .notEmpty()
        .withMessage("La descripción es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("La descripción debe tener al menos 10 caracteres."),
      validarCampos,
    ],
    validarPerfil(["ADMINISTRADOR"]),
    permisoController.crearPermiso
  )
  .get(
    "/",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    permisoController.consultarPermisos
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    permisoController.consultarPermisoPorId
  )
  .put(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    permisoController.editarPermisoPorId
  )
  .delete(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    permisoController.eliminarPermisoPorId
  );

module.exports = router;
