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
      const cart = await cartsModel.find({_id: id});
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

  async deleteCart(id) {
    try {
      const deleteCart = await cartsModel.findByIdAndDelete(id);
      return deleteCart;
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cid, pid, quantity) {
    try {
      const cartDB = await cartsModel
        .findById(cid)
        .populate("products.product");

      const existingProduct = cartDB.products.find(
        (product) => product.product._id.toString() === pid
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartDB.products.push({ product: pid, quantity: quantity });
      }

      cartDB.save();
      return cartDB;
    } catch (error) {
      return error;
    }
  }

  //Borra un solo producto de carrito cid
  async removeProductInCart(cid, pid) {
    try {
      const cartDB = await cartsModel.findById(cid).populate('products.product');
  
      const existingProduct = cartDB.products.find((product) => product.product._id.toString() === pid);
  
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          cartDB.products = cartDB.products.filter((product) => product.product._id.toString() !== pid);
        }
        cartDB.markModified('products');
        await cartDB.save();
        return cartDB;
      } else {
        throw new Error(`Producto ${pid} not encontrado en carrrito ${cid}`);
      }
    } catch (error) {
      return error;
    }
  }

  //Borra todos los productos del carrito cid (pedido en entrega)
  async removeProductsInCart(cid) {
    try {
      const cartDB = await cartsModel.findById(cid).populate('products');
      cartDB.products = [];
      await cartDB.save();
      return cartDB;
    } catch (error) {
      return error;
    }
  }

  async updateProductsInCart(cid, products) {
    try {
      const updatedProducts = products.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
      }));
    
      const updatedCart = await cartsModel.findByIdAndUpdate(cid
        , { products: updatedProducts }
        , { new: true })
        .populate('products.product');
      return updatedCart;
    } catch (error) {
      return error;
    }
  }

  async updateQuantityProductInCart(cid, pid, quantity) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(cid, {
        $set: {
          "products.$[product].quantity": quantity
        }
      }, {
        arrayFilters: [{
          "product.product": pid
        }],
      }).populate('products.product');
      return updatedCart;
    } catch (error) {
      return error;
    }
  }

  async getCartAndProductsById(cid) {
    try {
      const cartDB = await cartsModel
        .findById(cid)
        .populate("products.product")
        .lean(); // Convertir los documentos en objetos planos
      return cartDB;
    } catch (error) {
      return error;
    }
  }

}