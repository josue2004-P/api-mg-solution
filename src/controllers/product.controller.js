const productService = require("../services/product.service");
const { toInt } = require("../helpers/toInt");
const path = require("path");

// CONTROLLER CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, description, price,stock, categoryId, brandId, userCreateId } =
    req.body;

  if (!req.file) return res.status(400).json({ error: "No existe el archivo" });

  // Ruta de la imagen guardada
  const imagePath =  req.file.filename;

  try {
    const data = await productService.createProduct(
      name,
      description,
      price,
      stock,
      categoryId,
      brandId,
      userCreateId,
      imagePath
    );
    res.status(201).send({
      status: "Ok",
      message: "Operación Exitosa",
      data: {
        name,
        description,
        stock,
        categoryId,
        brandId,
        userCreateId,
        image: imagePath,
      },
    });
  } catch (error) {

    console.log(error)
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al crear",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET ALL PRODUCT
const getAllProduct = async (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;

  const filters = {
    name,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const records = await productService.getAllProduct(filters);

    res.status(201).send({
      status: "Ok",
      message: "Operación Exitosa",
      data: records,
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
        message: "Error inesperado al obtener",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const record = await productService.getProductById(id);

    res.status(201).send({
      status: "Ok",
      message: "Dato obtenido correctamente",
      data: record,
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
        message: "Error inesperado al obtener ",
        message: error.message,
      });
    }
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const answer = await productService.updateProductById(id, data);

    res.status(201).send({
      status: "Ok",
      message: `Dato editado correctamente`,
      data: answer,
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
        message: "Error inesperado al editadar ",
        message: error.message,
      });
    }
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await productService.deleteProductById(id);

    res.status(201).send({
      status: "Ok",
      message: `Eliminación exitosa`,
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
        message: "Error inesperado al eliminar",
        message: error.message,
      });
    }
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
