const express = require("express");
const router = express.Router();
const apiExternaController = require("../../controllers/apiExternaController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");

router.get(
  "/",
//   validarJWT,
//   validarPerfil(["ADMINISTRADOR"]),
  apiExternaController.consultarApiExterna
);

module.exports = router;
