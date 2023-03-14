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
        required: true
    }
    ,password: {
        type: String,
        required: true
    }
    ,role: {
        type: String,
        required: true,
        enum: ['administrador', 'usuario'],
        default: 'usuario'
    }
})

export const userModel = mongoose.model('Users', usersSchema);