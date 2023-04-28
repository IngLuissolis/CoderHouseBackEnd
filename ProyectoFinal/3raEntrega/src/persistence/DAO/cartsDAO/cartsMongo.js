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
              existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity);
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
    
        let allProductsInStock = true;
    
        for (const product of cartDB.products) {
          const availableStock = product.product.camiseta1.stock;
          if (availableStock < product.quantity) {
            allProductsInStock = false;
            break;
          }
        }
    
        console.log('allProductsInStock: ', allProductsInStock);
    
        if (allProductsInStock) {
          for (const product of cartDB.products) {
            const availableStock = product.product.camiseta1.stock;
            if (availableStock < product.quantity) {
              throw new Error(`Not enough stock for product ${product.product.camiseta1.nombre}`);
            }
            product.product.camiseta1.stock -= product.quantity;
            await product.product.save();
          }
    
          const amount = cartDB.products.reduce((total, product) => {
            return total + product.quantity * product.product.camiseta1.precio;
          }, 0);
    
          const ticket = await ticketModel.create({
            code: Math.random().toString(36).substring(2),
            purchase_datetime: Date.now(),
            amount,
            //purchaser: cartDB.user.email,
          });
    
          //await cartsModel.findByIdAndDelete(cid);
    
          return ticket;
        } else {
          throw new Error("One or more products are out of stock");
        }
      } catch (error) {
        return error;
      }
    }
    
}

export default new CartsMongo(cartsModel);