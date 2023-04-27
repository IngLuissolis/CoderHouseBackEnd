import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';
import config from './config.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import './persistence/mongo/mongoConfig.js';

const app = express();
const PORT = config.PORT;

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL

app.use(cookieParser());

app.listen(PORT, ()=> {
    console.log(`Escuchando puerto ${PORT}`);
})

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/views', viewsRouter);

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