import mongoose from "mongoose";

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
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    }
    , cart: {
        type: [{type: mongoose.Schema.Types.ObjectId
        , ref:'Carts'}]
    }
    , documents: [
        {
            name: String,
            reference: String
        }
    ]
    ,last_connection: {
      type: Date
    }
})

export const usersModel = mongoose.model('Users', usersSchema);