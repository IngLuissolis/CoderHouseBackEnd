import { Router } from 'express';
import { createCartController, getAllCartsController,
    findOneCartController, updateCartController,
    deleteCartController, addProductInCartController, 
    finalizePurchaseController } from '../controllers/carts.controller.js';

const router = new Router();

router.get('/', getAllCartsController);
router.get('/:id', findOneCartController);
router.post('/', createCartController);
router.put('/:id', updateCartController);
router.delete('/:id', deleteCartController);
router.post('/:cid/products/:pid', addProductInCartController);
router.get('/:cid/purchase', finalizePurchaseController);

export default router;