import swaggerJSDoc from 'swagger-jsdoc';

//configuracion swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Documentación API ecommerce',
        version: '1.0.0'
      },
    },
    apis: ['./src/docs/**/*.yaml']
  }

  export const swaggerSetup = swaggerJSDoc(swaggerOptions);