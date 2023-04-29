import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    //Forma de referenciar id de otra collection 'products' a esta collection 'carts'
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
            }
        },
    ]
})

//pre: middleware utilizado para realizar una operacion antes de devolver el resultado de la operacion principal
cartsSchema.pre('find', function (next) {
    this.populate('products.product');
    next();
});

export const cartsModel = mongoose.model('Carts', cartsSchema);