const express = require("express");
const router = express.Router();
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const pdfController = require("../../controllers/pdfController");

// Ruta para ver un PDF
router.get(
  "/:nombre",
  validarJWT,
  validarPerfil(["ADMINISTRADOR"]),
  pdfController.verPdf
);

module.exports = router;