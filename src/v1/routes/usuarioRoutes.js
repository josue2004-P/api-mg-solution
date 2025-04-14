const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/usuarioController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const { validarPermiso } = require("../../middlewares/validar-permiso");


router
	.get("/",
		validarJWT,
		validarPerfil(['ADMINISTRADOR']),
		validarPermiso('USUARIOS', 'nLeer'),
		usuarioController.obtenerUsuarios)

module.exports = router;
