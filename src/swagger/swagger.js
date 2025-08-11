const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MVP",
      version: "1.0.0",
      description:
        "Base API for projects, designed to serve as a fast and scalable starting point.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        XTokenAuth: {
          type: "apiKey",
          in: "header",
          name: "x-token",
          description: "Token personalizado para autenticación",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../v1/api-docs/*.js"),
    path.join(__dirname, "./v1/api-docs/*.js"),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
