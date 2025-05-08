const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de la API'
        }
    },
    apis: [
        path.join(__dirname, '../v1/api-docs/*.js'),
        path.join(__dirname, './v1/api-docs/*.js')
    ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;