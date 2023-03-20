import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../dao/mongoManagers/UsersManager.js";

const router = Router();
const usersManager = new UsersManager();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersManager.loginUser(req.body);
    if (user) {
        const token = generateToken(user);
        res.json({token})
    } else {
        res.json({message: "Usuario no existe"});
    }
})

export default router;