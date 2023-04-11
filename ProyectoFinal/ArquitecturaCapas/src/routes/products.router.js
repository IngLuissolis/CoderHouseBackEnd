import { createProductController, getAllProductsController } from "../controllers/products.controllers.js"
import { Router } from "express";

const router = Router();

router.post('/create', createProductController);
router.get('/listproducts', getAllProductsController);

export default router;