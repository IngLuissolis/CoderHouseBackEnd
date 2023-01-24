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