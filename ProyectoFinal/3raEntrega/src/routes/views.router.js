import { Router } from "express";
import { login, registro, errorLogin, 
    errorRegistro, products, perfil, addProduct } from '../controllers/views.controller.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';

const router = Router();

router.get('/', login);
router.get('/registro', registro);
router.get('/errorRegistro', errorRegistro);
router.get('/errorLogin', errorLogin);
router.get('/addProduct', addProduct);

// router.get('/jwtFront', (req, res) => {
//     res.render('jwt');
// })

export default router;