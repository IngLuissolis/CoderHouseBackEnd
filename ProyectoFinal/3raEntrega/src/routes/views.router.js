import { Router } from "express";
import { login, registro, errorLogin, errorRegistro } from '../services/views.service.js';

const router = Router();

router.get('/', login);
router.get('/registro', registro);
router.get('/errorRegistro', errorRegistro);
router.get('/errorLogin', errorLogin);

// router.get('/perfil', (req, res) => {
//     res.render('perfil');
// })

// router.get('/jwtFront', (req, res) => {
//     res.render('jwt');
// })

export default router;