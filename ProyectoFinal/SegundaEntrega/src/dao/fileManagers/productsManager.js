import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname + '/products.json';

export default class ProductsManager {

    async getAllProducts () {
        if(fs.existsSync(path)) {
            try {
                const productsFile = await fs.promises.readFile(path, 'utf8');
                return JSON.parse(productsFile);
            } catch (error) {
                return error;
            }
        } else {
            return [];
        }
    }

    async createProduct (product) {
        try {
            const productsFile = await this.getAllProducts();
            let id;
            if(productsFile.length == 0) {
                id = 1;
            } else {
                id = productsFile[productsFile.length - 1].id + 1;
            }
            const newProduct = {id,...product};
            productsFile.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
            return newProduct;
        } catch (error) {
            return error;
        }
    }
}