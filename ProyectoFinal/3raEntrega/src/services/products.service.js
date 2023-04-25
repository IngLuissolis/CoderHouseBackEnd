import productsMongo from "../persistence/DAO/productsDAO/productsMongo.js";

export const createProductService = async (product) => {
    const newProduct = await productsMongo.create(product);
    return newProduct;
}

export const getAllProductService = async () => {
    const products = await productsMongo.findAll();
    return products;
}

export const findOneProductService = async (id) => {
    const productId = await productsMongo.findOne(id);
    return productId;
}

export const deleteOneProductService = async (id) => {
    const productId = await productsMongo.deleteOne(id);
    return productId;
}