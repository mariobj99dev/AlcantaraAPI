import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación generada automáticamente'
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        './src/api/docs/schemas/*.js',  // Documentación de schemas
        './src/api/docs/endpoints/*.js',  // Documentación de rutas
    ]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
