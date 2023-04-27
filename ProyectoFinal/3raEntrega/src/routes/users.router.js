import { Router } from 'express';
import { getAllUsersController, createUserController, 
    findOneUserController, deleteOneUserController,
    loginUserController } from '../controllers/users.controller.js';

const router = new Router();

router.get('/', getAllUsersController);
router.get('/:id', findOneUserController);
router.post('/', createUserController);
router.delete('/:id', deleteOneUserController);
router.post('/login', loginUserController);

export default router;