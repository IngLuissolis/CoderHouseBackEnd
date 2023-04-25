import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [{type: mongoose.Schema.Types.ObjectId
            , ref:'Products'}]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
})

export const cartsModel = mongoose.model('Carts', cartsSchema);