import productsMongo from "../persistence/DAO/productsDAO/productsMongo.js";

export const createProductService = async (product, user) => {
    //const newProduct = await productsMongo.create(product);
    const newProduct = await productsMongo.addProduct(product, user);
    return newProduct;
}

export const getAllProductService = async () => {
    const products = await productsMongo.findAll();
    return products;
    // return products.map(product => ({
    //     ...product._doc,
    //     _id: product._id.toString() // convertir _id a string
    //   }));
}

export const findOneProductService = async (id) => {
    const productId = await productsMongo.findOne(id);
    return productId;
}

export const deleteOneProductService = async (id) => {
    const productId = await productsMongo.deleteOne(id);
    return productId;
}

export const updateProductService = async (id, product) => {
    const updateProduct = await productsMongo.updateOne(id, product);
    return updateProduct;
}