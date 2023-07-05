import { Router } from "express";
import { loginController, registroController, errorLoginController, 
    errorRegistroController, addProductController, 
    cartController, linkReestablecerController,
    allUsersController, loginPFAdminController,
    loginProductsController } from '../controllers/views.controller.js';

const router = Router();

router.get('/', loginController);
router.get('/registro', registroController);
router.get('/errorRegistro', errorRegistroController);
router.get('/errorLogin', errorLoginController);
router.get('/addProduct', addProductController);
router.get('/cart/:cid', cartController);
router.get('/linkReestablecer/:token', linkReestablecerController);
router.get('/allUsers', allUsersController);

router.get('/loginProducts', loginProductsController);

router.get('/viewsLoginPF', loginPFAdminController);

export default router;