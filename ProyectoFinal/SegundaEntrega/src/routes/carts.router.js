import { Router } from "express";
//import fs from "fs";
//import __dirname from '../utils.js';
//import CartsManager from "../dao/fileManagers/cartsManager.js";
import CartsManager from '../dao/mongoManagers/cartsManager.js';

const router = Router();
const cartsManager = new CartsManager();

router.get('/', async (req, res) => {
  const carts = await cartsManager.getAllCarts();
  if (carts.length === 0) {
    res.json({messagge: 'No hay carritos disponibles'});
  } else {
    res.json({messagge: 'Carritos disponibles', carts: carts});
  }
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  if (cart.length === 0) {
    res.json({messagge: 'Carrito no existe'});
  } else {
    // res.json({cart: cart });
    // obtener el carrito y sus productos de la base de datos
    const carts = await cartsManager.getCartAndProductsById(cid);
    res.render('carts', { carts });
  }
 })

router.post('/', async (req, res) => {
  const cartInfo = req.body;
  const newCart = await cartsManager.createCart(cartInfo);
  res.json({messagge: 'Carrito creado con Exito', newCart});
})

router.post('/:cid/products/:pid', async (req, res) => {
  let { cid } = req.params;
  let { pid } = req.params;
  let { quantity } = req.body;

  (quantity === '') ? quantity = 1: quantity;
  
  try {
    const newProductInCart = await cartsManager.addProductInCart(cid,pid, quantity);
    res.json({messagge: 'Producto agregado al carrito con exito', newProductInCart: newProductInCart});
  } catch (error) {
    res.status(404).json({messagge: error.message});
  }
})

router.delete('/:cid/products/:pid', async (req, res) => {
  let { cid } = req.params;
  let { pid } = req.params;
  await cartsManager.removeProductInCart(cid, pid);
  res.json({messagge: `Producto ${pid} eliminado con Exito de carrito ${cid}`})
})

router.delete('/:cid', async (req,res) => {
  let { cid } = req.params;
  await cartsManager.removeProductsInCart(cid);
  res.json({messagge: `Todos los Productos eliminados con Exito de carrito ${cid}`})
})

router.put('/:cid', async (req,res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const updateProducts = await cartsManager.updateProductsInCart(cid, products);
  res.json({messagge: 'Carrito actualizado con exito'});
})

router.put('/:cid/products/:pid', async (req,res) => {
  let { cid } = req.params;
  let { pid } = req.params;
  const { quantity } = req.body;
  const updateQuantityProductInCart = await cartsManager.updateQuantityProductInCart(cid, pid, quantity);
  res.json({messagge: `Cantidad actualizada de producto ${pid} con exito`});
})

export default router;

