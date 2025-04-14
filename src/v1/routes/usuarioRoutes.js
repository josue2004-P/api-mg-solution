const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/usuarioController");
const { validarJWT } = require("../../middlewares/validar-jwt");

router
	.post("/", usuarioController.loginUsuario)
	.post("/new",usuarioController.crearUsuario)
	.get("/renew",validarJWT, usuarioController.revalidarToken)

module.exports = router;
