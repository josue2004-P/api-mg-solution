const express = require("express");
const router = express.Router();
const perfilController = require("../../controllers/perfilController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const { validarCampos } = require("../../middlewares/validar-campos");

const { body } = require("express-validator");

router
  .post(
    "/",
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
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    perfilController.crearPerfil
  )
  .get(
    "/",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    perfilController.consultarPerfiles
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    perfilController.consultarPerfilPorId
  )
  .put(
    "/:id",
    [
      body("sDescripcion")
        .notEmpty()
        .withMessage("La descripción es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("La descripción debe tener al menos 10 caracteres."),
      validarCampos,
    ],
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    perfilController.editarPerfilPorId
  )
  .delete(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    perfilController.eliminarPerfilPorId
  );

module.exports = router;
