import productsManagerFile from './filesystem/productsManager.js';
import productsManagerMemory from './memory/productsManager.js';
import productsManagerMongo, { initMongoDB } from './mongodb/productsManager.js';
import usersManagerMongo from './mongodb/usersManager.js';
import { productModel } from './models/products.model.js';
import { userModel } from './models/users.model.js';

let persistenceProducts, persistenceUsers = null;

let argv = process.argv[2];

switch (argv) {
    case 'fs':
        persistenceProducts = new productsManagerFile();
        console.log(argv);
        break;
    case 'mongo':
        initMongoDB();
        persistenceProducts = new productsManagerMongo(productModel);
        persistenceUsers = new usersManagerMongo(userModel);
        console.log(argv);
        break;
    default:
        persistenceProducts = new productsManagerMemory();
        break;
}

export async function createProduct(product) {
    return await persistenceProducts.createProduct(product);
}

export async function getAllProducts() {
    return await persistenceProducts.getAllProducts();
}

export async function createUser(user) {
    return await persistenceUsers.createUser(user);
}

export async function loginUser(user) {
    return await persistenceUsers.loginUser(user);
}