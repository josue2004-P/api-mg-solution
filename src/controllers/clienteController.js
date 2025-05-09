const clienteService = require("../services/clienteService");
const { toInt } = require("../helpers/toInt");
const { getRutaPublica } = require("../helpers/getRutaPublica");
const fs = require("fs");
const path = require("path");

const obtenerClientes = async (req, res) => {
  const { nNoCuenta06Clientes, page = 1, limit = 5 } = req.query;

  const filtros = {
    nNoCuenta06Clientes,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const data = await clienteService.obtenerClientes(filtros);

    res.status(201).send({
      status: "Ok",
      message: "Clientes obtenidos correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al obtener los clietes",
        message: error.message,
      });
    }
  }
};

const crearCliente = async (req, res) => {
  const {
    nNoCuenta06Clientes,
    sNombreCliente,
    sApellidoPaternoCliente,
    sApellidoMaternoCliente,
  } = req.body;

  try {
    const data = await clienteService.crearCliente(
      nNoCuenta06Clientes,
      sNombreCliente,
      sApellidoPaternoCliente,
      sApellidoMaternoCliente,
    );

    res.status(201).send({
      status: "Ok",
      message: "Cliente creado exitosamente",
    });
  } catch (error) {
    // Si el error es por correo ya registrado
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      // Manejo de otros tipos de errores
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al crear el cliente",
        message: error.message,
      });
    }
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await usuarioService.obtenerUsuarioPorId(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario obtenidos correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al obtener el usuario",
        message: error.message,
      });
    }
  }
};

const desactivarClientePorId = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await usuarioService.desactivarUsuarioPorId(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario desactivado correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al desactivar a el usuario",
        message: error.message,
      });
    }
  }
};

const activarClientePorId = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await usuarioService.activarUsuarioPorId(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario activado correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al desactivar a el usuario",
        message: error.message,
      });
    }
  }
};

const editarClientePorId = async (req, res) => {
  const filePath = req.file?.path; // Ruta del archivo subido (si hay)

  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const archivoFile2 = req.file;
    const usuarioImagen = archivoFile2
      ? path.basename(archivoFile2.path)
      : null;
    data.usuarioImagen = usuarioImagen;

    const permiso = await usuarioService.editarUsuarioPorId(id, data);

    res.status(201).send({
      status: "Ok",
      message: "Usuario editado correctamente",
      data: {
        permiso,
      },
    });
  } catch (error) {
    // Si hay un error y se subió una imagen, eliminarla
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Elimina el archivo
    }

    console.log(error);
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al editadar el usuario",
        message: error.message,
      });
    }
  }
};

const generarExcel = async (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).send("El body debe ser un arreglo de objetos");
  }

  const filePath = await usuarioService.generarExcel(data);

  // Enviar el archivo como respuesta
  res.download(filePath, "datos.xlsx", (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
    }
    // Eliminar archivo temporal
    fs.unlinkSync(filePath);
  });
};

const generarPdf = async (req, res) => {

  const data = req.body

  const stream = await usuarioService.generarPdf(data);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="vale_almacen.pdf"');
  stream.pipe(res);
};

module.exports = {
  obtenerClientes,  
  crearCliente,
  obtenerClientePorId,
  editarClientePorId,
  desactivarClientePorId,
  activarClientePorId,
  generarExcel,
  generarPdf,
};
