const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");

const { createUserValidation } = require("../../middlewares/user.validate");

router.post(
  "/",
  validateJWT,
  createUserValidation,
  userController.createUser
);
router.get("/", validateJWT, userController.getAllUsers);
router.get("/:id", validateJWT, userController.getUserById);
router.get("/get-profiles-by-user-id/:id", validateJWT, userController.getProfilesByUserId);
router.put("/:id", validateJWT, userController.updateUserById);
router.put("/:id/activate-user", validateJWT, userController.activateUserById);
router.put(
  "/:id/deactivate-user",
  validateJWT,
  userController.deactivateUserById
);
router.post(
    "/assing-profiles-to-the-user",
    validateJWT,
    userController.assingProfileToTheUser
  )
module.exports = router;
