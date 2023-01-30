import { Router } from "express";
import fs from "fs";
import __dirname from '../utils.js';

console.log('dirname: ',__dirname);

const router = Router();

let carts = [];
let products = [];

const cartsFilePath = `${__dirname}/carrito.json`;
const productsFilePath = `${__dirname}/productos.json`;

// Cargar data de archivos al iniciar
fs.readFile(cartsFilePath, (err, data) => {
  if (!err) carts = JSON.parse(data);
});

fs.readFile(productsFilePath, (err, data) => {
  if (!err) products = JSON.parse(data);
});

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    const newCart = {
      id: generateId(),
      products: [],
    };
    carts.push(newCart);
    saveCarts();
    res.status(201).send(newCart);
});

// Listar productos en un carrito especifico
router.get("/:cid", async (req, res) => {
    const cart = carts.find((c) => c.id === parseInt(req.params.cid));
    if (!cart)
      return res.status(404).send("El carrito con el id especificado no fue encontrado.");
  
    res.send(cart.products);
});

// Agregar producto a un carrito especifico
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const cart = carts.find((c) => c.id === parseInt(cid));
    if (!cart)
      return res.status(404).send("El carrito con el id especificado no fue encontrado.");
  
    const product = {
      product: parseInt(pid),
      quantity: 1,
    };
  
    const existingProduct = cart.products.find(
      (p) => p.product === product.product
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push(product);
    }
  
    saveCarts();
    res.send(cart);
});

// Generar id unico
function generateId() {
    let id = 1;
    while (carts.find((c) => c.id === id)) {
      id++;
    }
    return id;
  }

// Salvar carts en archivo carrrito.json
function saveCarts() {
    fs.writeFile(cartsFilePath, JSON.stringify(carts), (err) => {
      if (err) console.error(err);
    });
}

export default router;