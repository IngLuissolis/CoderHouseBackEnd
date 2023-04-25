import { cartsModel } from "../../models/carts.model.js";
import BasicMongo from "../basicMongo.js";

class CartsMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }
}

export default new CartsMongo(cartsModel);