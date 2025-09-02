const productBrandService = require("../services/product.brand.service");
const { toInt } = require("../helpers/toInt");

// CONTROLLER CREATE PRODUCT BRAND
const createProductBrand = async (req, res) => {
  const { name, description } = req.body;

  try {
    const data = await productBrandService.createProductBrand(
      name,
      description
    );
    res.status(201).send({
      status: "Ok",
      message: "Operación Exitosa",
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
        message: "Error inesperado al crear",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET ALL PRODUCT BRAND
const getAllProductBrand = async (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;

  const filters = {
    name,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const records = await productBrandService.getAllProductBrand(
      filters
    );

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

// CONTROLLER GET PRODUCT CATEGORY  BY ID
const getProductBrandById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const record = await productBrandService.getProductBrandById(id);

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

const updateProductBrandById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const answer = await productBrandService.updateProductBrandById(
      id,
      data
    );

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

const deleteProductBrandById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await productBrandService.deleteProductBrandById(id);

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
  createProductBrand,
  getAllProductBrand,
  getProductBrandById,
  updateProductBrandById,
  deleteProductBrandById,
};
