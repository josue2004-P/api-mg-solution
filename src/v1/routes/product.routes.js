const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createProductValidation,
  updateProductValidation,
} = require("../../middlewares/product.validate");
const upload = require("../../middlewares/upload.middleware");

router.post(
  "/",
  upload.single("image"),
  createProductValidation,
  validateJWT,
  productController.createProduct
);
router.get("/", 
  validateJWT, 
  productController.getAllProduct);
router.get("/:id", 
  validateJWT, 
  productController.getProductById);
router.put(
  "/:id",
  updateProductValidation,
  validateJWT,
  productController.updateProductById
);
router.delete("/:id", 
  validateJWT, 
  productController.deleteProductById);

module.exports = router;
