const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const specs = require("./swagger/swagger"); // Importa la configuración de swagger desde el archivo correcto

// Rutas de la API
const v1UsuarioRouter = require("./v1/routes/usuarioRoutes");
const v1AuthRoutes = require("./v1/routes/authRoutes");
const v1PermisoRouter = require("./v1/routes/permisoRoutes");
const v1PerfilRouter = require("./v1/routes/perfilRoutes");
const v1PerfilUsuarioRouter = require("./v1/routes/perfilUsuarioRoutes");
const v1PerfilPermisosRouter = require("./v1/routes/perfilPermisoRoutes");
const v1ApiExternaRouter = require("./v1/routes/apiExternaRoutes");
const v1ImagesRouter = require("./v1/routes/imageRoutes");
const v1PdfsRouter = require("./v1/routes/pdfRoutes");
const v1FtpRouter = require("./v1/routes/ftpRoutes");
const v1ClienteRouter = require("./v1/routes/clientesRoutes");
const v1VentaGeneralRouter = require("./v1/routes/ventaGeneralRoutes");
const corsMiddleware = require('./config/cors.config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);

app.use(express.json());

// Directorio Público
app.use( express.static('public') );

// Configuración de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Rutas de la API
app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/usuarios", v1UsuarioRouter);
app.use("/api/v1/permisos", v1PermisoRouter);
app.use("/api/v1/perfiles", v1PerfilRouter);
app.use("/api/v1/perfilesUsuarios", v1PerfilUsuarioRouter);
app.use("/api/v1/perfilesPermisos", v1PerfilPermisosRouter);
app.use("/api/v1/apiExterna", v1ApiExternaRouter);
app.use("/api/v1/ftp", v1FtpRouter);  // Conexión FTP
app.use("/api/v1/pdfs", v1PdfsRouter);  // Ver PDFs
app.use("/api/v1/imagenes", v1ImagesRouter);  // Rutas para imágenes
app.use("/api/v1/clientes", v1ClienteRouter);  // Rutas para CLIENTES
app.use("/api/v1/ventaGeneral", v1VentaGeneralRouter);  // Rutas para CLIENTES

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
