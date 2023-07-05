import { Router } from 'express';
import { createProductController, getAllProductsController
    , findOneProductController, deleteOneProductController
    , updateOneProductController } from '../controllers/products.controller.js';
//import { checkRequiredFieldsProducts } from '../test/checkRequiredFieldsProducts.test.js';
import { authorize, authorizeDelete } from '../middlewares/authorize.middleware.js';

const router = new Router();

router.get('/', getAllProductsController);
router.get('/:id', findOneProductController);
router.post('/addProduct', authorize(['admin', 'premium']), createProductController);
router.delete('/:id', authorizeDelete(['admin', 'premium']), deleteOneProductController);
router.put('/:id', authorize(['admin']),updateOneProductController);

export default router;