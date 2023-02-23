import { productsModel } from '../models/products.model.js';

export default class ProductsManager {

    async getAllProducts() {
        try {
            const productsDB = await productsModel.find();
            return productsDB;
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await productsModel.create(product);
            return newProduct;
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, product) {
        try {
          const updatedProduct = await productsModel.findOneAndUpdate({ _id: id }, product, { new: true });
          return updatedProduct;
        } catch (error) {
          return error;
        }
      }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id);
            return deleteProduct;
        } catch (error) {
            return error;
        }
    }

}