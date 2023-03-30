import { Router } from "express";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import passport from "passport";

const router = Router();
const usersManager = new UsersManager();

router.post('/session', (req, res) => {
    const { username, password } = req.body;
    req.session.username = username;
    req.session.password = password;
    res.json({message: 'Sesion iniciada con exito'})
})

//registro sin passport
// router.post('/registro', async (req, res) => {
//     const newUser = await usersManager.createUser(req.body);
//     if (newUser) {
//         res.redirect('/views');
//     } else {
//         res.redirect('/views/errorRegistro');
//     }
// })

/*registro con passport*/
router.post('/registro', passport.authenticate('registro'
    , {
        failureRedirect: '/views/errorRegistro'
        ,successRedirect: '/views/perfil'
        , passReqToCallback: true
    })
)

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersManager.loginUser(req.body);
    if (user) {
        req.session.email =email;
        req.session.password =password;
        res.redirect('/api/products');
    } else {
        res.redirect('/views/errorLogin');
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(
        error => {
            if (error) {
                console.log(error);
                res.json({message: error});
            } else {
                res.redirect('/views');
            }
        }
    )
})

//endpoint va a hacia GitHub desde app
router.get('/registroGithub', 
    passport.authenticate('github', {scope: ['user: email']})
)

//endpoint viene de GitHub
router.get('/github', passport.authenticate('github'), 
    async (req, res) => {
        req.session.email = req.user.email;
        req.session.password = req.user.password;
        res.redirect('/api/products');
})

export default router;