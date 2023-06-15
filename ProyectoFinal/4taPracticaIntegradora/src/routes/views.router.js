import { Router } from "express";
import { loginController, registroController, errorLoginController, 
    errorRegistroController, addProductController, 
    cartController, linkReestablecerController } from '../controllers/views.controller.js';

const router = Router();

router.get('/', loginController);
router.get('/registro', registroController);
router.get('/errorRegistro', errorRegistroController);
router.get('/errorLogin', errorLoginController);
router.get('/addProduct', addProductController);
router.get('/cart/:cid', cartController);
router.get('/linkReestablecer/:token', linkReestablecerController);

export default router;