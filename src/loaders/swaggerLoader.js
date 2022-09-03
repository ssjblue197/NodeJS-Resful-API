const basicAuth = require('express-basic-auth')
const swagger = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const env = require('../configs/env')

module.exports = (app) => {
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: env.app.name,
                description: env.app.description,
                version: env.app.version,
                contact: {
                    name: 'Phung',
                    email: 'ssjblue197@gmail.com',
                },
                license: {
                    name: 'By © Mr.Phung',
                    url: 'https://www.facebook.com/ssjblue197',
                },
            },
            servers: [
                {
                    url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
                },
            ],
        },
        apis: ['src/docs/*.yml', 'src/apis/routes/*.js'],
    }

    if (env.isDevelopment && env.swagger.enabled) {
        app.use(
            env.swagger.route,
            env.swagger.username
                ? basicAuth({
                      users: {
                          [`${env.swagger.username}`]: env.swagger.password,
                      },
                      challenge: true,
                  })
                : (req, res, next) => next(),
            swagger.serve,
            swagger.setup(swaggerJsDoc(swaggerOptions), { explorer: true })
        )
    }
}
