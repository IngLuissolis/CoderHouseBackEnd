import { Router } from 'express';
import { getAllUsersController, createUserController, 
    findOneUserController, deleteOneUserController,
    loginUserController, uploadDocumentsController, 
    inactiveUsersController, loginPFAdminController, 
    changeRoleController } from '../controllers/users.controller.js';

import usersPremiumRouter from './usersPremium.router.js';

import upload from '../middlewares/multer.middleware.js';

const router = new Router();

router.get('/', getAllUsersController);

router.get('/inactiveUsers', inactiveUsersController);

router.get('/:id', findOneUserController);
router.post('/', createUserController);
router.delete('/:id', deleteOneUserController);
router.post('/login', loginUserController);

//
router.post('/loginPFAdmin', loginPFAdminController);
router.put('/editRoleUser/:id', changeRoleController);

router.post('/:id/documents', upload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'productImage', maxCount: 1 }
  ]), uploadDocumentsController);

router.use('/premium', usersPremiumRouter);

export default router;