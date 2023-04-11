import { Router } from "express";
import { generateToken } from "../utils.js";
import usersManagerMongo from "../persistence/mongodb/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router();
const usersManager = new usersManagerMongo();

/*Con Cookies */
router.post('/login', async (req, res) => {
    const user = await usersManager.loginUser(req.body);
    if (user) {
        const token = generateToken(user);
        console.log('Token guardado con exito en cookie')
        return res.cookie('token', token
        //Codigo para evitar que se recupere cookie token desde front End, muestra undefined
        ,{httpOnly:true}
        ).json({token})
    } else {
        console.log('Email o password incorrecto!');
        res.json({message: "Email o password invalido!"});
    }
})

router.get('/login', jwtValidation, async (req, res) => {
    console.log('Token Validado');
    res.redirect('../../views/perfil');
    // res.json({message: "Token Validado"
    // , first_name: req.user.user.first_name
    // , role: req.user.user.role});
})

export default router;