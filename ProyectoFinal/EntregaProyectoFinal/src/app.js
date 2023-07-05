import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';
import config from './config.js';
import cors from 'cors';

import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import mockingProductsRouter from './routes/mocking.router.js';
import messagesRouter from './routes/messages.router.js';
import cambiarPasswordRouter from './routes/cambiarPassword.router.js';
import paymentsRouter from './routes/payment.router.js';

import logger from './utils/winston.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSetup } from './utils/swaggerSpecs.js';
import './persistence/mongo/mongoConfig.js';

//
const app = express();
const PORT = config.PORT;

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL
//cors
app.use(cors());

app.use(cookieParser());

app.listen(PORT, ()=> {
    logger.info(`Escuchando puerto ${PORT}`);
})

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/views', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/mockingproducts', mockingProductsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/cambiarPassword', cambiarPasswordRouter);
app.use('/api/payments', paymentsRouter);
//swagger documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

//Carpeta con archivos publicos para el servidor, el archivo tiene que tener nombre index.js
app.use(express.static(__dirname + '/public'));

// handlebars - Motor de plantilla
app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(function(req, res, next) {
    res.locals.user = req.cookies.user || null;
    next();
  });

/*endpoint '/loggerTest'*/
app.get('/loggerTest', (req, res) => {
    logger.debug('Este es un mensaje de debug');
    logger.http('Este es un mensaje de http');
    logger.info('Este es un mensaje de info');
    logger.warning('Este es un mensaje de warning');
    logger.error('Este es un mensaje de error');
    logger.fatal('Este es un mensaje de fatal');
  
    res.send('Logs enviados al logger');
  });

