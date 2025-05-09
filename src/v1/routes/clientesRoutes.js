const express = require("express");
const router = express.Router();
const clienteController = require("../../controllers/clienteController");
const { validarJWT } = require("../../middlewares/validar-jwt");
const { validarPerfil } = require("../../middlewares/validar-perfil");
const { validarPermiso } = require("../../middlewares/validar-permiso");
const uploadImage = require("../../middlewares/uploadImageMiddleware");
const { body } = require("express-validator");
const { validarCampos } = require("../../middlewares/validar-campos");

// MIDLEWARE PERMISOS
// validarPermiso('USUARIOS', 'nLeer')

router
  .get(
    "/",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.obtenerClientes
  )
  .post(
    "/",
    validarJWT,
    [
      body("nNoCuenta06Clientes")
        .notEmpty()
        .withMessage("El numero de cliente es obligatorio."),
      body("sNombreCliente")
        .notEmpty()
        .withMessage("El nombre del cliente es obligatorio."),
      body("sApellidoPaternoCliente")
        .notEmpty()
        .withMessage("El apellido paterno del cliente es obligatorio."),
      body("sApellidoMaternoCliente")
        .notEmpty()
        .withMessage("El apellido materno del cliente es obligatorio."),
      validarCampos,
    ],
    validarPerfil(["CLIENTE"]),
    clienteController.crearCliente
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.obtenerClientePorId
  )
  .put(
    "/:id",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.editarClientePorId
  )
  .put(
    "/:id/desactivar",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.desactivarClientePorId
  )
  .put(
    "/:id/activar",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.activarClientePorId
  )
  .post(
    "/generar-excel",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.generarExcel
  )
  .post(
    "/generar-pdf",
    validarJWT,
    validarPerfil(["CLIENTE"]),
    clienteController.generarPdf
  );

module.exports = router;
