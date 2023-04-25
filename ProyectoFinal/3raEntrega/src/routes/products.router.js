import { Router } from 'express';
import { createProductController, getAllProductsController, findOneProductController, deleteOneProductController } from '../controllers/products.controller.js';
// import { authorize } from '../middlewares/authorize.middleware.js';

const router = new Router();

router.get('/', getAllProductsController);
router.get('/:id', findOneProductController);
router.post('/', createProductController);
router.delete('/:id', deleteOneProductController);

export default router;