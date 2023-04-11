import { createProductService, getAllProductsService } from "../services/products.services.js";

export const createProductController = async (req, res) => {
    const {body} = req;
    try {
        const product = await createProductService(body);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}