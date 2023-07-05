import { usersModel } from '../../models/users.model.js';
import { comparePassword } from '../../../utils.js';
import BasicMongo from "../basicMongo.js";

class UsersMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }

    async loginUser (user) {
        const { email, password } = user;
        //console.log('loginUser email: ', email);
        try {
            const usuario = await usersModel.findOne({email});
            //console.log('loginUser usuario: ', usuario);
            if (usuario) {
                const isPassword = await comparePassword(password, usuario.password);
                if (isPassword) {
                    // Si el correo electrónico y la contraseña coinciden con las del usuario administrador,
                    // establecemos el campo de rol en "administrador"
                    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                        usuario.role = "admin";
                    }
                    return usuario;
                }
            }

            return null;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UsersMongo(usersModel);