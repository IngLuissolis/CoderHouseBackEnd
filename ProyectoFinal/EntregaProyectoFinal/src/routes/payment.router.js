import { Router } from 'express';
import { createPaymentController } from '../controllers/payment.controller.js';

const router = new Router();

router.post('/payment-intents', createPaymentController);

export default router;