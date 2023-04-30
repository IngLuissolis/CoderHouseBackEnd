import { Router } from "express";
import { loginController, registroController, errorLoginController, 
    errorRegistroController, addProductController, 
    cartController } from '../controllers/views.controller.js';

const router = Router();

router.get('/', loginController);
router.get('/registro', registroController);
router.get('/errorRegistro', errorRegistroController);
router.get('/errorLogin', errorLoginController);
router.get('/addProduct', addProductController);
router.get('/cart/:cid', cartController);

export default router;