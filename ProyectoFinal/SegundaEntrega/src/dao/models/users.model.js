import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }
    ,last_name: {
        type: String,
        required: true
    }
    ,email: {
        type: String,
        required: true,
        unique: true
    }
    ,age: {
        type: Number,
        required: true,
        default: 0
    }
    ,password: {
        type: String,
        required: true
    }
    ,role: {
        type: String,
        required: true,
        enum: ['administrador', 'user'],
        default: 'user'
    }
    , cart: {
        type: [{type: mongoose.Schema.Types.ObjectId
        , ref:'Carts'}]
    }
})

usersSchema.pre('find', function (next) {
    this.populate('carts');
    next();
})

export const userModel = mongoose.model('Users', usersSchema);