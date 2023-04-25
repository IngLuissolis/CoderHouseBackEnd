import { productsModel } from "../../models/products.model.js";
import BasicMongo from "../basicMongo.js";

class ProductsMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }
}

export default new ProductsMongo(productsModel);
