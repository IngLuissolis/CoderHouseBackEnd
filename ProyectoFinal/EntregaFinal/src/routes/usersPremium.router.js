import { Router } from 'express';
import { changeRoleController } from '../controllers/users.controller.js';

const router = new Router();

router.get('/:id', changeRoleController);

export default router;