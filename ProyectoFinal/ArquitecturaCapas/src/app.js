import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import config from './config.js';
//
import productsRouter from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import jwtRouter from './routes/jwt.router.js';

const app = express(); // A partir de aquí, app contendra todas las funcionalidades de express
const PORT = config.PORT;

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL

app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});

//Configuración de las rutas
app.use('/views', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/jwt', jwtRouter);

//Carpeta con archivos publicos para el servidor, el archivo tiene que tener nombre index.js
app.use(express.static(__dirname + '/public'));

// handlebars - Motor de plantilla
app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
