const { Router } = require("express");
const router = Router();

const v1AuthRoutes = require("./auth.routes");
const v1ProfileRoutes = require("./profile.routes");
const v1PermissionRoutes = require("./permissions.routes");
const v1UserRoutes = require("./user.routes");
const v1ImagesRoutes = require("./images.routes");

//routes
router.use("/auth", v1AuthRoutes);
router.use("/profile", v1ProfileRoutes);
router.use("/permission", v1PermissionRoutes);
router.use("/user", v1UserRoutes);
router.use("/images", v1ImagesRoutes);

module.exports = router;
