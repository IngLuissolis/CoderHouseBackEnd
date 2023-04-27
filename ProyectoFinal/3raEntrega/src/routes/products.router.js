import { Router } from 'express';
import { createProductController, getAllProductsController
    , findOneProductController, deleteOneProductController
    , updateOneProductController } from '../controllers/products.controller.js';
import { authorize } from '../middlewares/authorize.middleware.js';

const router = new Router();
const isAdmin = authorize(['admin']);
const isUser = authorize(['user']);

router.get('/', getAllProductsController);
router.get('/:id', findOneProductController);
router.post('/addProduct', isAdmin, createProductController);
router.delete('/:id', isAdmin, deleteOneProductController);
router.put('/:id', isAdmin, updateOneProductController);

export default router;