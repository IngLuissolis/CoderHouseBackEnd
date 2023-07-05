import { Router } from 'express';
import { generateProductsMockingController } from '../controllers/mocking.controller.js';

const router = new Router();

router.get('/', generateProductsMockingController);

export default router;