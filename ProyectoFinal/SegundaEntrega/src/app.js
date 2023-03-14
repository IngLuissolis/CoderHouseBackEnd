import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import fs from "fs";
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
//passport
import passport from 'passport';
import './passport/passportStrategies.js';
//importar los archivos de rutas
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import messagesRouter from './routes/messages.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
//
import MessagesManager from './dao/mongoManagers/messagesManager.js';
//import DBConfig
import './dao/dbConfig.js';

const app = express(); // A partir de aquí, app contendra todas las funcionalidades de express
const PORT = 3000;
const messagesManager = new MessagesManager();

//Variable que guarda los mensajes del chat
let infoMensajes = [];

let products = [];
const productsFilePath = `${__dirname}/products.json`;
products = JSON.parse(fs.readFileSync(productsFilePath));

//Escuchando puerto 3000
const htppServer = app.listen(PORT,() => {
    console.log(`Escuchando puerto ${PORT}`);
})

//Primero tenemos que configurar nuestro servidor para que pueda recibir información del cliente
app.use(express.json()); //como indica el metodo, ahora el servidor podra recibir JSONS al momento de la petición
app.use(express.urlencoded({extended:true})); //permite que se pueda enviar información tambien desde la URL

//Mongo session
app.use(
    session(
    {
        secret: 'sessionKey'
        ,resave: false
        ,saveUninitialized: true
        ,cookie: {maxAge: 15000}
        ,store: new mongoStore({
            mongoUrl: 'mongodb+srv://ingedusolis:Htkr6Os7ZRlJjzBB@cluster0.7td5aft.mongodb.net/ecommerceCoder?retryWrites=true&w=majority'
        })
    }
))

//Configuracion passport
app.use(passport.initialize());
//passport va a guardar la informacion de session
app.use(passport.session());

//Configuración de las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/chat', chatRouter);
app.use('/viewsMessages', messagesRouter);
app.use('/users', usersRouter);
app.use('/views', viewsRouter);

//Carpeta con archivos publicos para el servidor, el archivo tiene que tener nombre index.js
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

//ruta para mostrar al cliente chat


//Creación de socketServer
const socketServer = new Server(htppServer);

/****** WebSocket del lado del Server *********/
//Escuchar evento de tipo connection y disconnect
// '.on' escucha eventos
// '.emit' emite eventos desde el servidor
socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('nuevoUsuario', usuario => {
        //broadcast emite a todos los usuarios conectados menos al nuevoUsuario 
        socket.broadcast.emit('broadcast', usuario);
    })

    socket.on('mensaje', async info => {
        //guardar Mensajes en MongoDB
        const newMessage = await messagesManager.createMessage(info);
        console.log('Nuevo Mensaje guardado: ',newMessage);
        infoMensajes.push(info);
        socketServer.emit('chat', infoMensajes);
    }) 

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

        console.log('Productos: ', products);

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