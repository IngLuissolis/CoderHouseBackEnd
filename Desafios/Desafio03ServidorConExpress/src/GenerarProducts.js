import { promises as fs } from 'fs';

let products = [];

for (let i = 0; i < 10; i++) {
    let product = {
        "title": "Producto " + i,
        "description": "Este es un producto " + i,
        "price": 10,
        "thumbnail": "Sin imagen",
        "code": "abc" + (i+1),
        "stock": 10,
        "id": i
    }
    products.push(product);
}

let json = JSON.stringify(products);

fs.writeFile('products.json', json, 'utf8', (err) => {
    if (err) throw err;
    console.log('Archivo creado con éxito');
});