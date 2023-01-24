import express from 'express';
import ProductManager from './ProductManager.js';

const app = express(); // A partir de aquí, app contendra todas las funcionalidades de express

// Crear una instancia de ProductManager
const productManager = new ProductManager("products.json");

//Productos

app.get('/products', async (req, res) => {
    let products = await productManager.getProducts();
    if (req.query.limit) {
      products = products.slice(0, req.query.limit);
    }
    res.json({ products });
  });
  
app.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res.status(404).json({ error: 'Producto No encontrado' });
    } else {
      res.json({ product });
    }
});


app.listen(8080,() => {
    console.log("Server iniciado en puerto 8080");
})


// app.get('/saludo',(req, res) => {
//     res.send("Hola a todos, pero ahora desde express!")
// })

/**
 * Utilizamos los (:) para indicar quq queremos que ese sea el parametro.
 * 
 */
// app.get('/unparametro/:nombre',(req, res) => {
//     //:parametro que se encontrara dentro del objeto req.params
//     console.log(req.params.nombre);
//     res.send(`Bienvenidos, ${req.params.nombre}`);
// })

// app.listen(8080,() => {
//     console.log("Servidor arriba en puerto 8080")
// })

// app.use(express.urlencoded({extended:true}));

// app.get('/ejemploQueries',(req,res)=> {
//     let consultas = req.query;
//     let {nombre, apellido, edad} = req.query;

//     res.send(consultas);
// })

// app.listen(8080,() => {
//     console.log("Escuchando puerto 8080")
// })