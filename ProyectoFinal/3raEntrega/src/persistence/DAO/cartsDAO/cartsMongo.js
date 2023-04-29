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

      //console.log('cid: ', cid);

      for (const product of cartDB.products) {
        const availableStock = product.product.camiseta1.stock;
        if (availableStock < product.quantity) {
          outOfStockProducts.push(product._id);
        } else {
          product.product.camiseta1.stock -= product.quantity;
          await product.product.save();
          console.log('product.product.save()', product.product.camiseta1);
        }
      }

      if (outOfStockProducts.length > 0) {
        cartDB.products = cartDB.products.filter(
          (product) => !outOfStockProducts.includes(product._id)
        );
        await cartDB.save();
        return cartDB;
      }

      const amount = cartDB.products.reduce((product) => {
        console.log('product.product.camiseta1.precio', product.product.camiseta1.precio);
        console.log('product.quantity', product.quantity);
        return product.quantity * product.product.camiseta1.precio;
      }, 0);

      console.log('amount', amount);
      //
      // const ticket = await ticketModel.create({
      //   code: Math.random().toString(36).substring(2),
      //   purchase_datetime: Date.now(),
      //   amount,
      //   purchaser: userEmail,
      // });

      // //await cartsModel.findByIdAndDelete(cid);

      // return ticket;
    } catch (error) {
      return error;
    }
  }
}

export default new CartsMongo(cartsModel);