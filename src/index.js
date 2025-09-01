const express = require("express");
const swaggerUI = require("swagger-ui-express");
const specs = require("./swagger/swagger"); 
const corsMiddleware = require("./config/cors.config"); 

// Rutas de la API
const v1Routes = require("./v1/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);

app.use(express.json());

// Directorio Público
app.use( express.static('public') );

// Servir todas las imágenes en /images
app.use("/images", express.static('storage/images'));

// Configuración de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/v1/", v1Routes); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
