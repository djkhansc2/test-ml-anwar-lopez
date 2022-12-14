const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swaggerM.json'
const endpointsFiles = ['./routes/index.js']
const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Search: {
            q:'some data (input)'
        },
        Item: {
            id:'some ID'
        }
    }
}
swaggerAutogen(outputFile, endpointsFiles, doc)