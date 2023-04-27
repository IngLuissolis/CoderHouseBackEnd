import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    imgBandera: {
        type: String
        //,required: true
    },
    nombre: {
        type: String
        ,required: true
    },
    grupo: {
        type: String
        ,required: true,
    },
    camiseta1: {
        imgCamiseta: {
            type: String
            //,required: true
        },
        precio: {
            type: Number
            //,required: true
        },
        stock: {
            type: Number
            //,required: true            
        }
    },
    camiseta2: {
        imgCamiseta: {
            type: String
            //,required: true
        },
        precio: {
            type: Number
            //,required: true
        },
        stock: {
            type: Number
            //,required: true       
        }
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema);