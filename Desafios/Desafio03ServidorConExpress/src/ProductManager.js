import { promises as fs } from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
  }

  async addProduct(product) {
    product.id = this.id++;
    this.products.push(product);
    await this.saveToFile();
  }

  async getProducts() {
    await this.loadFromFile();
    return this.products;
  }

  async getProductById(id) {
    await this.loadFromFile();
    return this.products.find(product => product.id == id);
  }

  async updateProduct(id, newProduct) {
    await this.loadFromFile();
    let index = this.products.findIndex(product => product.id === id);
    if(index === -1) throw new Error("Producto No Encontrado");
    newProduct.id = id;
    this.products[index] = newProduct;
    await this.saveToFile();
  }

  async deleteProduct(id) {
    await this.loadFromFile();
    let index = this.products.findIndex(product => product.id === id);
    if(index === -1) throw new Error("Producto No Encontrado");
    this.products.splice(index, 1);
    await this.saveToFile();
  }

  async loadFromFile() {
    try {
      let data = await fs.readFile(this.path);
      this.products = JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("Archivo no encontrado, creando Archivo Nuevo");
        await this.saveToFile();
      } else {
        throw err;
      }
    }
  }

  async saveToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.products));
  }
}

export default ProductManager;