const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profile.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createProfileValidation,
  updateProfileValidation,
} = require("../../middlewares/profile.validate");

router.post(
  "/",
  createProfileValidation,
  validateJWT,
  profileController.createProfile
);
router.get("/", validateJWT, profileController.getAllProfiles);
router.get("/:id", validateJWT, profileController.getProfileById);
router.put(
  "/:id",
  updateProfileValidation,
  validateJWT,
  profileController.updateProfileById
);
router.delete("/:id", validateJWT, profileController.deleteProfileById);

module.exports = router;
