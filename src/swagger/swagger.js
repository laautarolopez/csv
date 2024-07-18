const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Thomas Lautaro López - CSV Exercise API',
            description: "API endpoints for an exercise documented on swagger",
            contact: {
                name: "Thomas Lautaro López",
                email: "laautarolopez@gmail.com",
                url: "https://github.com/laautarolopez/csv"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:4000/api",
                description: "Local server"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        credits: {
                            type: "number"
                        }
                    }
                },
                Transfer: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        from_id: {
                            type: "string"
                        },
                        to_id: {
                            type: "string"
                        },
                        amount: {
                            type: "number"
                        },
                        date: {
                            type: "string",
                            format: "date"
                        }
                    }
                }
            }
        }
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

const setupSwagger = (app) => app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = setupSwagger