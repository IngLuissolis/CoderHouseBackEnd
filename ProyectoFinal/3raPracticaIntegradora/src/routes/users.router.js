import { Router } from 'express';
import { getAllUsersController, createUserController, 
    findOneUserController, deleteOneUserController,
    loginUserController, changeRoleController } from '../controllers/users.controller.js';

const router = new Router();

router.get('/', getAllUsersController);
router.get('/:id', findOneUserController);
router.post('/', createUserController);
router.delete('/:id', deleteOneUserController);
router.post('/login', loginUserController);
router.get('/premium/:id', changeRoleController);

export default router;