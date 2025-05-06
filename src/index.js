const express = require("express");
const cors = require("cors");

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


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/usuarios", v1UsuarioRouter);
app.use("/api/v1/permisos", v1PermisoRouter);
app.use("/api/v1/perfiles", v1PerfilRouter);
app.use("/api/v1/perfilesUsuarios", v1PerfilUsuarioRouter);
app.use("/api/v1/perfilesPermisos", v1PerfilPermisosRouter);
app.use("/api/v1/apiExterna", v1ApiExternaRouter);

// CONEXION FTP
app.use("/api/v1/ftp", v1FtpRouter);


// Ruta para ver PDFs (verifica autenticación)
app.use("/api/v1/pdfs", v1PdfsRouter);
// IMAGENES
app.use("/api/v1/imagenes/", v1ImagesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puesto ${PORT}`);
});
