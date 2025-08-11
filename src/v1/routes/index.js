const { Router } = require("express");
const router = Router();

const v1AuthRoutes = require("./auth.routes");
const v1ProfileRoutes = require("./profile.routes");
const v1PermissionsRoutes = require("./permissions.routes");

//routes
router.use("/auth", v1AuthRoutes);
router.use("/profile", v1ProfileRoutes);
router.use("/permission", v1PermissionsRoutes);

module.exports = router;
