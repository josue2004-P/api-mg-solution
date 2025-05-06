const usuarioService = require("../services/usuarioService");
const { toInt } = require("../helpers/toInt");
const { getRutaPublica } = require("../helpers/getRutaPublica");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const obtenerUsuarios = async (req, res) => {
  const { sNombre, page = 1, limit = 5 } = req.query;

  const filtros = {
    sNombre,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const data = await usuarioService.obtenerUsuarios(filtros);

    res.status(201).send({
      status: "Ok",
      message: "Usuarios obtenidos correctamente",
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
        message: "Error inesperado al obtener los usuarios",
        message: error.message,
      });
    }
  }
};

const crearUsuario = async (req, res) => {
  const filePath = req.file?.path; // Ruta del archivo subido (si hay)
  const {
    sNombre,
    sApellidoPaterno,
    sApellidoMaterno,
    sUsuario,
    sEmail,
    sPassword,
  } = req.body;

  const archivoFile2 = req.file;
  const usuarioImagen = archivoFile2 ? path.basename(archivoFile2.path) : null;

  try {
    const data = await usuarioService.crearUsuario(
      sNombre,
      sApellidoPaterno,
      sApellidoMaterno,
      sUsuario,
      sEmail,
      sPassword,
      usuarioImagen
    );

    res.status(201).send({
      status: "Ok",
      message: "Usuario creado exitosamente",
      // data,
    });
  } catch (error) {
    // Si hay un error y se subió una imagen, eliminarla
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Elimina el archivo
    }

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
        message: "Error inesperado al crear el usuario",
        message: error.message,
      });
    }
  }
};

const obtenerUsuarioPorId = async (req, res) => {
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

const desactivarUsuarioPorId = async (req, res) => {
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

const activarUsuarioPorId = async (req, res) => {
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

const editarUsuarioPorId = async (req, res) => {
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
  obtenerUsuarios,  
  crearUsuario,
  obtenerUsuarioPorId,
  editarUsuarioPorId,
  desactivarUsuarioPorId,
  activarUsuarioPorId,
  generarExcel,
  generarPdf,
};
