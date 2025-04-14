const express = require("express");
const router = express.Router();
const perfilUsuarioController = require("../../controllers/perfilUsuarioController");
const { validarJWT } = require("../../middlewares/validar-jwt");

router
	.post("/",validarJWT,perfilUsuarioController.crearPerfilUsuario)
	// .get("/",permisoController.crearUsuario)
	// .get("/:id",validarJWT, permisoController.revalidarToken)
	// .put("/:id",validarJWT, permisoController.revalidarToken)
	// .delete("/:id",validarJWT, permisoController.revalidarToken)

module.exports = router;
