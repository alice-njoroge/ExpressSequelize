const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: " Express API Documentation",
            version: "1.0.0",
            description:
                "A test project to understand how easy it is to document and Express API",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: "Info@SmartBear.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3031"
            }
        ]
    },
    apis: [
        "./swaggerModels/Todo.js"
    ]
};

module.exports = options;