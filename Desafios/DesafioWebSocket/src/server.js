import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import fs from "fs";

//importar los archivos de rutas
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

let products = [];
const productsFilePath = `${__dirname}/productos.json`;
const app = express(); // A partir de aquí, app contendra todas las funcionalidades de express

//Escuchando puerto 8080
const htppServer = app.listen(8080,() => {
    console.log("Escuchando puerto 8080");
})

//Creación de socketServer
const socketServer = new Server(htppServer);

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL

//Configuración de las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Carpeta con archivos publicos para el servidor, el archivo tiene que tener nombre index
app.use(express.static(__dirname + '/public'));

// handlebars - Motor de plantilla
app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//ruta para mostrar al cliente web home
app.get('/', (req, res) => {
    products = JSON.parse(fs.readFileSync(productsFilePath));
    res.render('home', {products});
})

//ruta para mostrar al cliente web /realTimeProducts
app.get('/realtimeproducts', (req, res) => {
    products = JSON.parse(fs.readFileSync(productsFilePath));
    res.render('realTimeProducts', {products}); //renderiza al inicio products
})

/****** WebSocket del lado del Server *********/


//Escuchar evento de tipo connection y disconnect
// '.on' escucha eventos
// '.emit' emite eventos desde el servidor
socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('createProduct', (product) => {
        //Validación campo status
        if (product.status === undefined || product.status == true) {
            product.status = true;
        } else {
            product.status = false;
        }

        const newProduct = {
            id: generateId(),
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails || []
          };

        products.push(newProduct);
        saveProducts();
        socket.emit('actualizarListaClient', products);
    });

    socket.on('deleteProduct', (eliminarId) => {
        console.log('eliminarProduct id: ', eliminarId);
        const productIndex = products.findIndex(p => p.id == parseInt(eliminarId));
        products.splice(productIndex, 1);
        saveProducts();
        socket.emit('actualizarListaClient', products);
    })

    socket.on('disconnect', ()=> {
        console.log('Usuario desconectado');
    })
})

// Generar id unico
function generateId() {
    let id = 1;
    while (products.find((p) => p.id == id)) {
      id++;
    }
    return id;
  }

// Salvar products en archivo productos.json
function saveProducts() {
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) console.error(err);
    });
  }