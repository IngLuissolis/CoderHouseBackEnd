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

router.post('/', async (req, res) => {
  const cartInfo = req.body;
  const newCart = await cartsManager.createCart(cartInfo);
  res.json({messagge: 'Carrito creado con Exito', newCart});
})

router.post('/:cid/product/:pid', async (req, res) => {
  let { cid } = req.params;
  let { pid } = req.params;
  try {
    const newProductInCart = await cartsManager.addProductInCart(cid,pid);
    res.json({messagge: 'Producto agregado al carrito con exito', newProductInCart: newProductInCart});
  } catch (error) {
    res.status(404).json({messagge: error.message});
  }
  
})

export default router;

