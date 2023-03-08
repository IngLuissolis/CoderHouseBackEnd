import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    imgBandera: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    grupo: {
        type: String,
        required: true,
    },
    camiseta1: {
        type: String,
        required: true,
    },
    camiseta2: {
        type: String,
        required: true,
    },
    camiseta1Stock: {
        type: Number,
        required: true,
    },
    camiseta2Stock: {
        type: Number,
        required: true,
    },
    camiseta1Precio: {
        type: Number,
        required: true,
    },
    camiseta2Precio: {
        type: Number,
        required: true,
    },
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema);