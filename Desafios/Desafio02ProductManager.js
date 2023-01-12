const fs = require("fs");

class ProductManager {

  constructor(path) {
    this.path = path;
    this.id = 0;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "[]");
    }
  }

  addProduct(product) {
    product.id = this.id++;
    this.products.push(product);
    this.saveToFile();
  }

  getProducts() {
    this.loadFromFile();
    return this.products;
  }

  getProductById(id) {
    this.loadFromFile();
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, newProduct) {
    this.loadFromFile();
    let index = this.products.findIndex(product => product.id === id);
    if(index === -1) throw new Error("Producto no Encontrado");
    newProduct.id = id;
    this.products[index] = newProduct;
    this.saveToFile();
  }

  deleteProduct(id) {
    this.loadFromFile();
    let index = this.products.findIndex(product => product.id === id);
    if(index === -1) throw new Error("Producto no Encontrado");
    this.products.splice(index, 1);
    this.saveToFile();
  }

  loadFromFile() {
    const fs = require("fs");
    try {
      let data = fs.readFileSync(this.path);
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveToFile() {
    const fs = require("fs");
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

}

//Proceso de Testing
const productManager = new ProductManager("products.json");
console.log(productManager.getProducts()); // debe devolver un arreglo vacío []
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});
console.log(productManager.getProducts()); // debe devolver arreglo [{ id: 0, title: "producto prueba", ... }]
console.log(productManager.getProductById(0)); // debe devolver arreglo [{ id: 0, title: "producto prueba", ... }]
productManager.updateProduct(0, {
  title: "producto prueba actualizado",
  description: "Este es un producto prueba actualizado",
  price: 300,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 30
});
console.log(productManager.getProductById(0)); // debe devolver producto actualizado
productManager.deleteProduct(0);
console.log(productManager.getProducts()); // ebe devolver arreglo vacío []