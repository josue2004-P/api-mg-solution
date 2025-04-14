const express = require("express");
const router = express.Router();
const perfilController = require("../../controllers/perfilController");
const { validarJWT } = require("../../middlewares/validar-jwt");

router
	.post("/",validarJWT,perfilController.crearPerfil)
	.get("/",validarJWT, perfilController.consultarPerfiles)
	.get("/:id",validarJWT, perfilController.consultarPerfilPorId)
	.put("/:id",validarJWT, perfilController.editarPerfilPorId)
	.delete("/:id",validarJWT, perfilController.eliminarPerfilPorId)


module.exports = router;
