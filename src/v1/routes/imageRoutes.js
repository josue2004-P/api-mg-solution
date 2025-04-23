const express = require("express");
const router = express.Router();
const imagesController = require("../../controllers/imagesController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");

router
	.get("/:nombre",validarJWT,validarPerfil(['ADMINISTRADOR']),imagesController.consultarImagenes)

module.exports = router;
