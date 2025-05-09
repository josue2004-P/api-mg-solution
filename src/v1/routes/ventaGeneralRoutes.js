const express = require("express");
const router = express.Router();
const ventaGeneralController = require("../../controllers/ventaGeneralController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");

router
  .post(
    "/",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    ventaGeneralController.crearVentaGeneral
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    ventaGeneralController.obtenerVentaGeneral
  );

module.exports = router;
