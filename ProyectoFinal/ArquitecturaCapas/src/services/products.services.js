import { createProduct, getAllProducts } from "../persistence/persistence.js";

export async function createProductService(product) {
    const prod = await createProduct(product);
    return prod;
}

export async function getAllProductsService() {
    const products = await getAllProducts();
    return products;
}

