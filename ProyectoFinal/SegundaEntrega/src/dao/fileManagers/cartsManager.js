import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname + '/carts.json';

let products = [];
const productsFilePath = `${__dirname}/products.json`;
products = JSON.parse(fs.readFileSync(productsFilePath));

export default class CartsManager {

    async getAllCarts () {
        if(fs.existsSync(path)) {
            try {
                const cartsFile = await fs.promises.readFile(path, 'utf8');
                return JSON.parse(cartsFile);
            } catch (error) {
                return error;
            }
        } else {
            return [];
        }
    }

    async createCart (cart) {
        try {
            const cartsFile = await this.getAllCarts();
            let id;
            if(cartsFile.length === 0) {
                id = 1;
            } else {
                id = cartsFile[cartsFile.length - 1].id + 1;
            }
            const newCart = {id,...cart};
            cartsFile.push(newCart);
            await fs.promises.writeFile(path, JSON.stringify(cartsFile));
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async addProductInCart (cid, pid) {
        try {
            const cartsFile = await this.getAllCarts();
            const cartFile = cartsFile.find((c) => c.id == cid);
            const productFile = products.find((p) => p.id == pid);
            if(cartFile === undefined ||  productFile === undefined) {
                return undefined;
            }
            const product = {
                product: pid,
                quantity: 1,
            }
            const existingProduct = cartFile.products.find(
                (p) => parseInt(p.product) == product.product
            );
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
              cartFile.products.push(product);
            }
            await fs.promises.writeFile(path, JSON.stringify(cartsFile));
            return cartFile;
        } catch (error) {
            return error;
        }
    }
}