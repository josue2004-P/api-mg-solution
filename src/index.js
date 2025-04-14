const express = require("express");
const cors = require("cors");

const v1UsuarioRouter = require("./v1/routes/usuarioRoutes");
const v1PermisoRouter = require("./v1/routes/permisoRoutes");
const v1PerfilRouter = require("./v1/routes/perfilRoutes");
const v1PerfilUsuarioRouter = require("./v1/routes/perfilUsuarioRoutes");
const v1PerfilPermisosRouter = require("./v1/routes/perfilPermisoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())

app.use("/api/v1/usuarios",v1UsuarioRouter);
app.use("/api/v1/permisos",v1PermisoRouter);
app.use("/api/v1/perfiles",v1PerfilRouter);
app.use("/api/v1/perfilesUsuarios",v1PerfilUsuarioRouter);
app.use("/api/v1/perfilesPermisos",v1PerfilPermisosRouter);






app.listen(PORT, ()=>{ console.log(`Servidor corriendo en el puesto ${PORT}`)});


