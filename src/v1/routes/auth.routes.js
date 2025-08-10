const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { validarJWT } = require("../../middlewares/validate.jwt");

const { loginAuthValidacion, createAuthValidacion }  = require("../../middlewares/auth.validate");

router.post("/", loginAuthValidacion, authController.loginUser);
router.post("/new", createAuthValidacion, authController.createUser);
router.get("/renew", validarJWT, authController.revalidateToken);

module.exports = router;    