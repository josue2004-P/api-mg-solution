const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createProductValidation,
  updateProductValidation,
} = require("../../middlewares/product.validate");
const upload = require("../../middlewares/upload.middleware");


router.get("/", 
  productController.getAllProduct);

module.exports = router;
