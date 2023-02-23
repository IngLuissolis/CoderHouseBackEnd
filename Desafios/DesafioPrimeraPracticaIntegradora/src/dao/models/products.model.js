import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        required: false
    }
})


export const productsModel = mongoose.model('Products', productsSchema);