import { Router } from 'express';
import { comparePassword } from '../utils.js';

const router = new Router();

router.post('/', async (req, res) => {
    const { password } = req.body;
    const user = JSON.parse(req.cookies.user);
    try {
        const compararPassword = await comparePassword(password, user.password);

        console.log('compararPassword: ', compararPassword);

        if (compararPassword) {
            console.log("No se puede colocar la misma contraseña");
        } else {
            console.log('Contraseña Actualizada');
        }
        //res.json({message: 'User found', userId});
    } catch (error) {
        res.json({message: 'Error', error});
    }
})

export default router;