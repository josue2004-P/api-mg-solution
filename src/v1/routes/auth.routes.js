const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { validarJWT } = require("../../middlewares/validar-jwt");

const { loginAuthValidacion, crearAuthValidacion }  = require("../../middlewares/auth.validacion");

router.post("/", loginAuthValidacion, authController.loginUsuario);
router.post("/new", crearAuthValidacion, authController.crearUsuario);
router.get("/renew", validarJWT, authController.revalidarToken);

module.exports = router;    