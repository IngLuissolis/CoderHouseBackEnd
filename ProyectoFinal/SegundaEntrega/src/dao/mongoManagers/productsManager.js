import { productsModel } from '../models/products.model.js';
import fs from 'fs';
import __dirname from '../../utils.js';

const productsData = JSON.parse(fs.readFileSync(__dirname+'/data/paises.json', 'utf8'));

export default class ProductsManager {

    async createProductMongoAtlas () {
        try {
            const productsCreateMongoAtlas = await productsModel.create(productsData);
            return productsCreateMongoAtlas;
        } catch (error) {
            return error;
        }
    }

    //metodo para realizar solicitud GET con pagination
    async paginateProducts(limit, page) {
        try {
            const products = await productsModel.paginate(
            //filtrado
            {},
            //limit y page
            {page, limit});
            return products;
        } catch (error) {
            return error;
        }
    }

    //metodo para realizar solicitud GET con aggregate
    async aggregateProducts(grupo, orden1Precio){
        try {
            const products = await productsModel.aggregate([
                {$match: {grupo: grupo}},
                { $sort: { camiseta1Precio: orden1Precio === "asc" ? 1 : -1 } }
            ]);
            //console.log('products: ', products);
            return products;
        } catch (error) {
            return error;
        }
    }

    // async getAllProducts() {
    //     try {
    //         const productsDB = await productsModel.find();
    //         return productsDB;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    async getAllProducts (limit, page, sort, query) {
        try {
            const sortQuery = sort === 'asc' 
            ? { camiseta1Precio: 1 } 
            : sort === 'desc' 
            ? { camiseta1Precio: -1 } 
            : {};

            const filterQuery = query ? { "grupo": query } : {};

            const options = {
                limit: limit,
                page: page,
                sort: sortQuery,
                lean: true
            }

            const products = await productsModel
            .paginate(
                filterQuery,
                options
            )

            return products;

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