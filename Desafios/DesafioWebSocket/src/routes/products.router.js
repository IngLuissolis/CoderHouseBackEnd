import { Router } from "express";
import fs from "fs";
import __dirname from '../utils.js';

const router = Router();
const productsFilePath = `${__dirname}/productos.json`;

let products = [];

//Lee archivo productos.json al inicio, en caso de no existir lo genera con array vacio
try {
  products = JSON.parse(fs.readFileSync(productsFilePath));
} catch (err) {
  fs.writeFileSync(productsFilePath, JSON.stringify([]));
}

router.get("/", async (req, res) => {
  let limit = req.query.limit || products.length;
  res.send(products.slice(0, limit));
});

router.get("/:pid", async (req, res) => {
    let pid = req.params.pid;
    const product = products.find((p) => p.id === parseInt(pid));
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Producto No Encontrado' });
    }
 });

router.post("/", async (req, res) => {
    let { title, description, code, price, stock, category, thumbnails, status } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      res.status(400).send({ message: 'Campos Requeridos No Encontrados' });
      return;
    }

    //Validación campo status
    if (req.body.status === undefined) {
        status = true;
    }

    const newProduct = {
      id: generateId(),
      title,
      description,
      code,
      price,
      status: status,
      stock,
      category,
      thumbnails: thumbnails || []
    };
    products.push(newProduct);
    saveProducts();

    res.status(201).send(newProduct);
});

router.put("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const productIndex = products.findIndex((p) => p.id === parseInt(pid));
  if (productIndex === -1) {
    return res.status(404).send({ message: "Producto No Encontrado" });
  }

  const existingProduct = products[productIndex];
  
  const {
    title = existingProduct.title,
    description = existingProduct.description,
    code = existingProduct.code,
    price = existingProduct.price,
    stock = existingProduct.stock,
    category = existingProduct.category,
    thumbnails = existingProduct.thumbnails,
    status = existingProduct.status,
  } = req.body;

  products[productIndex] = {
    ...products[productIndex],
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
    status,
  };
  saveProducts();
  res.send(products[productIndex]);
});

router.delete("/:pid", async (req, res) => {
    let pid = req.params.pid;
    const productIndex = products.findIndex(p => p.id == parseInt(pid));
    if (productIndex === -1) {
        return res.status(404).send({ message: 'Producto No Encontrado' });
    }
    products.splice(productIndex, 1);
    saveProducts();
    res.send({ message: 'Producto Borrado' });
})

// Generar id unico
function generateId() {
  let id = 1;
  while (products.find((p) => p.id === id)) {
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

export default router;
