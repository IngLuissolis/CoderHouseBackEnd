import { createUserService, loginUserService } from "../services/users.services.js";

export const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUserService(req.body);
        if(user) {
            console.log('user :', user);
            res.redirect('../../views/perfil');
        } else {
            console.log("email o password invalido");
            res.redirect('../../views/errorLogin');
        }
    } catch (error) {
        console.log(error);
    }
}