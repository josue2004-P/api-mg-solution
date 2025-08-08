const { Router } = require("express");
const router = Router();

const v1AuthRoutes = require("./auth.routes");

// Monta rutas hijas
router.use("/auth", v1AuthRoutes);

module.exports = router;
