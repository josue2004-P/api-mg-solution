const express = require("express");
const router = express.Router();
const permisoController = require("../../controllers/permisoController");
const { validarJWT } = require("../../middlewares/validar-jwt");

router
	.post("/",validarJWT,permisoController.crearPermiso)
	.get("/",validarJWT, permisoController.consultarPermisos)
	.get("/:id",validarJWT, permisoController.consultarPermisoPorId)
	.put("/:id",validarJWT, permisoController.editarPermisoPorId)
	.delete("/:id",validarJWT, permisoController.eliminarPermisoPorId)

module.exports = router;
