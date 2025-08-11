const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");

const {
  loginAuthValidation,
  createAuthValidation,
} = require("../../middlewares/auth.validate");

router.post("/", loginAuthValidation, authController.loginUser);
router.post("/new", createAuthValidation, authController.createUser);
router.get("/renew", validateJWT, authController.revalidateToken);

module.exports = router;
