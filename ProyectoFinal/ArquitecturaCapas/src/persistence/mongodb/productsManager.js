import mongoose from 'mongoose';
import { productModel } from '../models/products.model.js';
import config from "../../config.js";

export const initMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGOURL);
        console.log("Conectado a Mongo!!!");
    } catch (error) {
        console.log(error);
    }
}

export default class productsManagerMongo {
    async createProduct(product) {
        try {
            const newProduct = await productModel.create(product);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProducts() {
        try {
            const productsDB = await productModel.find();
            return productsDB;
        } catch (error) {
            return error;
        }
    }

    // async getAllProducts (limit, page, sort, query) {
    //     try {
    //         const sortQuery = sort === 'asc' 
    //         ? { camiseta1Precio: 1 } 
    //         : sort === 'desc' 
    //         ? { camiseta1Precio: -1 } 
    //         : {};

    //         const filterQuery = query ? { "grupo": query } : {};

    //         const options = {
    //             limit: limit,
    //             page: page,
    //             sort: sortQuery,
    //             lean: true
    //         }

    //         const products = await productModel
    //         .paginate(
    //             filterQuery,
    //             options
    //         )

    //         return products;

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}
    