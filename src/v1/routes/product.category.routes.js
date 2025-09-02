const express = require("express");
const router = express.Router();
const productCategoryController = require("../../controllers/product.category.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createProductCategoryValidation,
  updateProductCategoryValidation,
} = require("../../middlewares/product.category.validate");

router.post(
  "/",
  createProductCategoryValidation,
  validateJWT,
  productCategoryController.createProductCategory
);
router.get("/", 
  validateJWT, 
  productCategoryController.getAllProductCategory);
router.get("/:id", 
  validateJWT, 
  productCategoryController.getProductCategoryById);
router.put(
  "/:id",
  updateProductCategoryValidation,
  validateJWT,
  productCategoryController.updateProductCategoryById
);
router.delete("/:id", 
  validateJWT, 
  productCategoryController.deleteProductCategoryById);

module.exports = router;
