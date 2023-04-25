import { usersModel } from '../../models/users.model.js';
import BasicMongo from "../basicMongo.js";
import {comparePassword, hashPassword } from '../../../utils.js';
import UsersDBDTO from '../../DTO/usersDTO/usersDB.dto.js';
import UsersRespDTO from '../../DTO/usersDTO/usersRes.dto.js';

class UsersMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }

    async loginUser (user) {
        const { email, password } = user;
        try {
            const usuario = await usersModel.findOne({email});
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
}

export default new UsersMongo(usersModel);

// export default class UsersMongo {
//     async getAllUsers() {
//         try {
//             const users = await usersModel.find();
//             return users; 
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async createUser(objUser) {
//         try {
//             const userDBDTO = new UsersDBDTO(objUser);
//             const newUser = await usersModel.create(userDBDTO);
//             const userResDTO = new UsersRespDTO(newUser);
//             return userResDTO;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async loginUser() {
//         try {
            
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }