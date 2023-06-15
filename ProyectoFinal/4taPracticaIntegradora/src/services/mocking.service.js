import { faker } from '@faker-js/faker';


export function generateProductsMockingService () {
    const products = [];

    for(let i=0; i<100; i++) {
        const product = generateProduct();
        products.push(product);
    }

    return products;
}

function generateProduct () {
    const product = {
        id: faker.database.mongodbObjectId(),
        nombre: faker.commerce.productName(),
        grupo: faker.commerce.productName(),
        camiseta1: {
            precio: faker.commerce.price(),
            stock: faker.random.numeric(),
        }
    }

    return product;
}