const express = require("express");
const router = express.Router();
const permissionController = require("../../controllers/permission.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createPermissionValidation,
  updatePermissionValidation,
} = require("../../middlewares/permission.validate");

router.post(
  "/",
  createPermissionValidation,
  validateJWT,
  permissionController.createPermission
);
router.get("/", validateJWT, permissionController.getAllPermissions);
router.get("/:id", validateJWT, permissionController.getPermissionById);
router.put(
  "/:id",
  updatePermissionValidation,
  validateJWT,
  permissionController.updatePermissionById
);
router.delete("/:id", validateJWT, permissionController.deletePermissionById);

module.exports = router;
