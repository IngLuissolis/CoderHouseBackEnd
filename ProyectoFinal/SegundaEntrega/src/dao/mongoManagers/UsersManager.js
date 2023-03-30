import { userModel } from '../models/users.model.js';
import { comparePassword, hashPassword } from "../../utils.js";

export default class UsersManager {

    async createUser (user) {
        const { email, password } = user;
        try {
            const existeUsuario = await userModel.find({email});
            if (existeUsuario.length === 0) {
                const hashNewPassword = await hashPassword(password);
                const newUser = {...user, password: hashNewPassword};
                await userModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    //abcde
    
    async loginUser (user) {
        const { email, password } = user;
        try {
            const usuario = await userModel.findOne({email});
            if (usuario) {
                const isPassword = await comparePassword(password, usuario.password);
                if (isPassword) {
                    // Si el correo electrónico y la contraseña coinciden con las del usuario administrador,
                    // establecemos el campo de rol en "administrador"
                    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                        usuario.role = "administrador";
                    }
                    return usuario;
                }
            } 
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({email})
            .lean()
            .exec();
            if (user) {
                // Si el correo electrónico pertenece al usuario administrador,
                // establecemos el campo de rol en "administrador"
                if (email === "adminCoder@coder.com") {
                    user.role = "administrador";
                } else {
                    user.role = "user";
                }
            }
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}