import { productsModel } from "../../models/products.model.js";
import BasicMongo from "../basicMongo.js";

class ProductsMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }

    async addProduct(product, user) {
        try {
            // Obtener el valor de la cookie "user"
            //console.log('user: ', user.email);
            // Verificar si el producto tiene un propietario especificado
            if (!product.owner) {
                // Si no se especifica un propietario, establecerlo como "admin" por defecto
                product.owner = "admin";
            }
            
            // Aquí puedes realizar cualquier otra validación o procesamiento antes de guardar el producto
            product.owner = user.email;
            // Crear el nuevo producto en la base de datos
            const newProduct = await this.model.create(product);
            
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductsMongo(productsModel);
