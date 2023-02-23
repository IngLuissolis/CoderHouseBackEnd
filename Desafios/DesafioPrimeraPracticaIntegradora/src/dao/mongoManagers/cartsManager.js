import { cartsModel } from '../models/carts.model.js';
import { productsModel } from '../models/products.model.js';

export default class CartsManager {
  async getAllCarts() {
    try {
      const cartsDB = await cartsModel.find();
      return cartsDB;
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(id);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createCart(cart) {
    try {
      const newCart = await cartsModel.create(cart);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async updateCart(id, cart) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate({ _id: id }, cart, {
        new: true,
      });
      return updatedCart;
    } catch (error) {
      return error;
    }
  }

  async deleteCart(id) {
    try {
      const deleteCart = await cartsModel.findByIdAndDelete(id);
      return deleteCart;
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cid, pid) {
    try {
      const cartDB = await cartsModel.findById(cid);
      const productDB = await productsModel.findById(pid);

      if (!cartDB || !productDB) {
        throw new Error(
          "El carrito o producto con el ID especificado no fue encontrado."
        );
      }

      const product = {
        _id: pid,
        quantity: 1,
      };

      const existingProduct = await cartDB.products.find(
        (p) => p._id.toString() == product._id
      );

      if (existingProduct) {
        existingProduct.quantity++;
        product.quantity = existingProduct.quantity;
      } else {
        cartDB.products.push(product);
      }

      const newProductInCart = await cartsModel.findByIdAndUpdate(
        cid,
        { $set: { products: cartDB.products } },
        { new: true }
      );

      return newProductInCart;
    } catch (error) {
        throw error;
    }
  }
}