import mongoose from 'mongoose';

const URI = 'mongodb+srv://ingedusolis:Htkr6Os7ZRlJjzBB@cluster0.7td5aft.mongodb.net/ecommerceCoder?retryWrites=true&w=majority';

mongoose.connect(URI, (error) => {
    if (error) {
        console.log('Error de conexión a base de datos')
    } else {
        console.log('Conectado a la base de datos MongoDB Cloud con exito')
    }
});