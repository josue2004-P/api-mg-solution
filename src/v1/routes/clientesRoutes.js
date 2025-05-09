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
    validarPerfil(["ADMINISTRADOR"]),
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
        .withMessage("El nombre del cliente es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El nombre del cliente debe tener al menos 4 caracteres."),
      body("sApellidoPaternoCliente")
        .notEmpty()
        .withMessage("El apellido paterno del cliente es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El apellido paterno del cliente debe tener al menos 4 caracteres."),
      body("sApellidoMaternoCliente")
        .notEmpty()
        .withMessage("El apellido materno del cliente es obligatorio.")
        .isLength({ min: 4 })
        .withMessage("El apellido materno del cliente debe tener al menos 4 caracteres."),
      validarCampos,
    ],
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.crearCliente
  )
  .get(
    "/:id",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.obtenerClientePorId
  )
  .put(
    "/:id",
    validarJWT,
    uploadImage.single("usuarioImagen"),
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.editarClientePorId
  )
  .put(
    "/:id/desactivar",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.desactivarClientePorId
  )
  .put(
    "/:id/activar",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.activarClientePorId
  )
  .post(
    "/generar-excel",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.generarExcel
  )
  .post(
    "/generar-pdf",
    validarJWT,
    validarPerfil(["ADMINISTRADOR"]),
    clienteController.generarPdf
  );

module.exports = router;
