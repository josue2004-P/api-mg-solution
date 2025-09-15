const { Router } = require("express");
const router = Router();

const v1AuthRoutes = require("./auth.routes");
const v1ProfileRoutes = require("./profile.routes");
const v1PermissionRoutes = require("./permissions.routes");
const v1UserRoutes = require("./user.routes");
const v1ImagesRoutes = require("./images.routes");
const v1ProductCategoryRoutes = require("./product.category.routes");
const v1ProductBrandRoutes = require("./product.brand.routes");
const v1ProductRoutes = require("./product.routes");v1ProductRoutes
const v1ProductPublicRoutes = require("./product.public.routes");v1ProductRoutes
const v1TestimonyRoutes = require("./testimony.routes");
const v1WhastsAppConfigurationRoutes = require("./whatsApp.configuration.routes");
const v1GaleryConfigurationRoutes = require("./galery.configuration.routes");
const v1CustomerRoutes = require("./customer.routes");

//routes
router.use("/auth", v1AuthRoutes);
router.use("/profile", v1ProfileRoutes);
router.use("/permission", v1PermissionRoutes);
router.use("/user", v1UserRoutes);
router.use("/images", v1ImagesRoutes);
router.use("/product-category", v1ProductCategoryRoutes);
router.use("/product-brand", v1ProductBrandRoutes);
router.use("/product", v1ProductRoutes);
router.use("/product-public", v1ProductPublicRoutes);
router.use("/testimony", v1TestimonyRoutes);
router.use("/whatsApp-configuration", v1WhastsAppConfigurationRoutes);
router.use("/galery-configuration", v1GaleryConfigurationRoutes);
router.use("/customer", v1CustomerRoutes);

module.exports = router;
