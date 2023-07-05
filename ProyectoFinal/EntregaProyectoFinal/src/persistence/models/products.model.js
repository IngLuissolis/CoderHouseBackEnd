import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    imgBandera: {
        type: String
        //,required: true
    },nombre: {
        type: String
        ,required: true
    },grupo: {
        type: String
        ,required: true,
    }
    ,precio: {
        type: Number
        //,required: true
    }
    ,owner: {
        type: String
        , default: 'admin'
    },stock: {
        type: Number
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema);