const express = require("express");
const router = express.Router();
const productBrandController = require("../../controllers/product.brand.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createProducBrandValidation,
  updateProductBrandValidation,
} = require("../../middlewares/product.brand.validate");

router.post(
  "/",
  createProducBrandValidation,
  validateJWT,
  productBrandController.createProductBrand
);
router.get("/", 
  validateJWT, 
  productBrandController.getAllProductBrand);
router.get("/:id", 
  validateJWT, 
  productBrandController.getProductBrandById);
router.put(
  "/:id",
  updateProductBrandValidation,
  validateJWT,
  productBrandController.updateProductBrandById
);
router.delete("/:id", 
  validateJWT, 
  productBrandController.deleteProductBrandById);

module.exports = router;
