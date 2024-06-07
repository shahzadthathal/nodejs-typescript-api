import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Node.js API',
                version: '1.0.0',
                description: 'The Category API allows users to perform CRUD (Create, Read, Update, Delete) operations on categories. The Post API allows users to perform CRUD operations on posts, which are associated with categories.',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            //security: [{ bearerAuth: [] }],
        },
        apis: ['./src/routes/*.ts'],
    };

    const specs = swaggerJsdoc(options);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
}
