const express = require("express");
const router = express.Router();
const ftpController = require("../../controllers/ftpController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");

router
  .get(
    "/",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    ftpController.rutaRaiz
  )
  .get(
    "/descargar-archivo/:filename",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    ftpController.descargarArchivo
  );

module.exports = router;
