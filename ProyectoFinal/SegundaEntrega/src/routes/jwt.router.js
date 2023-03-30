import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";

const router = Router();
const usersManager = new UsersManager();

/*Sin Cookies */
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await usersManager.loginUser(req.body);
//     if (user) {
//         const token = generateToken(user);
//         res.json({token})
//     } else {
//         res.json({message: "Usuario no existe"});
//     }
// })

/*Con Cookies */
router.post('/login', async (req, res) => {
    const user = await usersManager.loginUser(req.body);
    if (user) {
        const token = generateToken(user);
        console.log('Token guardado con exito en cookie porque existe User')
        return res.cookie('token', token
        //Codigo para evitar que se recupere cookie token desde front End, muestra undefined
        ,{httpOnly:true}
        ).json({token})
    } else {
        console.log('Usuario no existe en Base de Datos')
        res.json({message: "Usuario no existe"});
    }
})

router.get('/login', jwtValidation, async (req, res) => {
    console.log('Token Validado');
    //res.send('Token Validado');
    res.json({message: "Token Validado"
    , first_name: req.user.user.first_name
    , role: req.user.user.role});
})

// router.get('/loginJWTPassport', passport.authenticate('jwt'
//     //Codigo para apagar session
//     ,{session: false})
//     , async (req, res) => {
//         res.send('JWT PASSPORT');
// })

export default router;