import express from 'express';
// import __dirname from './utils.js';

// console.log('dirname: ',__dirname);

//importar los archivos de rutas
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express(); // A partir de aquí, app contendra todas las funcionalidades de express

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL

//Carpeta con archivos publicos para el servidor, el archivo tiene que tener nombre index
// app.use(express.static(__dirname + '/public'));

//Configuración de las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080,() => {
    console.log("Escuchando puerto 8080");
})