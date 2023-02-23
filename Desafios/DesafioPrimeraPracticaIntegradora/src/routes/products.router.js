import { Router } from "express";
//import ProductsManager from "../dao/fileManagers/productsManager.js";
import ProductsManager from '../dao/mongoManagers/productsManager.js';

const router = Router();
const productsManager = new ProductsManager();

router.get('/', async (req, res) => {
  const products = await productsManager.getAllProducts();
  if (products.length === 0) {
    res.json({messagge: 'No hay productos disponibles'})
} else {
    res.json({messagge: 'Productos disponibles', products: products});
}
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsManager.getProductById(id);
  if (product) {
    res.json({ product });
  } else {
    res.send("No existe producto en base de datos");
  }
});

router.post('/', async (req, res) => {
  const productInfo = req.body;
  const newProduct = await productsManager.createProduct(productInfo);
  res.json({messagge: 'Producto creado con Exito', newProduct});
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const productInfo = req.body;
  const updateProduct = await productsManager.updateProduct(id, productInfo);
  res.json({messagge: 'Producto modificado con Exito', updateProduct});
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const deleteProduct = await productsManager.deleteProduct(id);
  res.json({messagge: 'Producto eliminado con Exito', product: deleteProduct});
})

export default router;
