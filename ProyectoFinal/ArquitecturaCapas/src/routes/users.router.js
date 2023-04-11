import { loginUserController } from "../controllers/users.controllers.js";
import { Router } from "express";

const router = Router();

router.post('/login', loginUserController);

export default router;