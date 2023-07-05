import { cartsModel } from "../../models/carts.model.js";
import { ticketModel } from "../../models/ticket.model.js";
import BasicMongo from "../basicMongo.js";

class CartsMongo extends BasicMongo {
  constructor(model) {
    super(model);
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
        existingProduct.quantity =
          parseInt(existingProduct.quantity) + parseInt(quantity);
      } else {
        cartDB.products.push({ product: pid, quantity: quantity });
      }

      cartDB.save();
      return cartDB;
    } catch (error) {
      return error;
    }
  }

  async finalizePurchase(cid) {
    try {
      const cartDB = await cartsModel
        .findById(cid)
        .populate("products.product");

      let outOfStockProducts = [];

      //console.log('cartMongo cartDB: ', cartDB.products);

      for (const product of cartDB.products) {
        const availableStock = product.product.stock;
        if (availableStock < product.quantity) {
          outOfStockProducts.push(product._id);
        } else {
          product.product.stock -= product.quantity;
          await product.product.save();
          //console.log('product.product.save()', product.product.nombre);
        }
      }

      //console.log('outOfStockProducts.length: ', outOfStockProducts.length);

      if (outOfStockProducts.length > 0) {
        cartDB.products = cartDB.products.filter(
          (product) => !outOfStockProducts.includes(product._id)
        );
        await cartDB.save();
        return cartDB;
      }

      const amount = cartDB.products.reduce((total, product) => {
        return total + product.quantity * product.product.precio;
      }, 0);

      //console.log('amount', amount);
      
      const ticket = await ticketModel.create({
        code: Math.random().toString(36).substring(2),
        purchase_datetime: Date.now(),
        amount,
        //purchaser: userEmail,
      });

      await cartsModel.findByIdAndDelete(cid);

      return ticket;
    } catch (error) {
      return error;
    }
  }
}

export default new CartsMongo(cartsModel);