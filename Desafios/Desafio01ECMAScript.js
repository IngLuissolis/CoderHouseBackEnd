class ProductManager {
    constructor() {
      this.products = [];
      this.idCounter = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Error: Todos los campos son obligatorios');
        return;
      }
      if (this.getProductByCode(code)) {
        console.log('Error: Ya existe un producto con el código especificado');
        return;
      }
      const product = {
        id: ++this.idCounter,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      };
      this.products.push(product);
    }
  
    //Metodo que busca producto que coincida id
    getProductById(id) {
      for (const product of this.products) {
        if (product.id === id) {
          return product;
        }
      }
      console.log('Not found');
      return null;
    }

    //Metodo que valida que no se repita el campo "code"
    getProductByCode(code) {
      for (const product of this.products) {
        if (product.code === code) {
          return product;
        }
      }
      return null;
    }

    //Metodo que devuelve arreglo con todos los productos creados hasta el momento
    getProducts() {
      return this.products;
    }
  }

//Proceso de Testing
const productManager = new ProductManager();
console.log(productManager.getProducts()); // debe devolver un arreglo vacío []
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); //se agrega producto al arreglo
console.log(productManager.getProducts()); // debe mostrar el producto agregado con un ID autoincrementable
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); // debe arrojar un error porque el código del producto está repetido
console.log(productManager.getProductById(1)); // debe mostrar el producto con ID 1
console.log(productManager.getProductById(2)); // debe arrojar un error "Not found"