import { Router } from 'express';
import { getAllUsersController, createUserController, findOneUserController, deleteOneUserController } from '../controllers/users.controller.js';

const router = new Router();

router.get('/', getAllUsersController);
router.get('/:id', findOneUserController);
router.post('/', createUserController);
router.delete('/:id', deleteOneUserController);

export default router;