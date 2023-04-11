export default class productsManagerMemory {
    constructor () {
        this.products = [];
    }

    async createProduct (product) {
        this.products.push(product);
        return product;
    }

    async getAllProducts () {
        return this.products;
    }
}