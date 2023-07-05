import mongoose from "mongoose";

import {
  createCartService,
  getAllCartsService,
  updateCartService,
  findOneCartService,
  deleteCartService,
  addProductInCartService,
  finalizePurchaseService,
} from "../services/carts.service.js";

import { findOneProductService } from '../services/products.service.js';


export const createCartController = async (req, res) => {
  const cartObj = req.body;
  try {
    const newCart = await createCartService(cartObj);
    res.json({ message: "Cart created successfully", cart: newCart });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const getAllCartsController = async (req, res) => {
  try {
    const carts = await getAllCartsService();
    res.json({ carts: carts });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const findOneCartController = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await findOneCartService(id);

    //console.log('carts.Controller : ', cart);

    const cartProducts = await Promise.all(cart.products.map(async (product) => {

      const productId = product.product._id.toString();

      //console.log('product Id: ', productId);

      const producto = await findOneProductService(productId);

      //console.log('producto: ', producto);

      return {
        quantity: product.quantity,
        nombre: producto.nombre,
        precio: producto.precio,
        owner: producto.owner
      };
    }));

    const cartId = cart._id;

    res.render('cart', { cartId, cartProducts });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const updateCartController = async (req, res) => {
  const { id } = req.params;
  const cartObj = req.body;
  try {
    // Obtener información actual del producto
    const cart = await findOneCartService(id);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Actualizar información del producto
    const updatedCart = await updateCartService(id, cartObj);

    res.json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const deleteCartController = async (req, res) => {
  const { id } = req.params;
  try {
    const cartId = await deleteCartService(id);
    res.json({ message: "Cart delete" });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const addProductInCartController = async (req, res) => {
  let { cid } = req.params;
  let { pid } = req.params;
  let { quantity } = req.body;

  quantity === "" ? (quantity = 1) : quantity;

  try {
    const newProductInCart = await addProductInCartService(cid, pid, quantity);
    res.json({
      messagge: "Producto agregado al carrito con exito",
      newProductInCart: newProductInCart,
    });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const finalizePurchaseController = async (req, res) => {
  try {
    const { cid } = req.params;

    console.log('carts.Controller: cid ', cid);

    const ticket = await finalizePurchaseService(cid);
    res.json(ticket);
  } catch (error) {
    res.status(500).json(error);
  }
};
