import { Router } from 'express';
import { transporter } from '../utils/nodemailer.js';
import { client } from '../utils/twilio.js';
import config from '../config.js';
import jwt from 'jsonwebtoken';

const router = new Router();

router.get('/', async (req, res) => {
    try {
        // Generar el token
        const token = jwt.sign({ userId: 'ID_DEL_USUARIO' }, 'SECRETO_DEL_TOKEN', { expiresIn: '5m' });

        // Enviar el correo electrónico
        await transporter.sendMail({
            from: 'CoderHouse',
            to: 'edusolis@yahoo.com.ar',
            subject: 'Restablecer Contraseña',
            html: `<h1>Restablecer Contraseña</h1>
                   <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                   <a href="http://localhost:3000/views/linkReestablecer/${token}">Restablecer Contraseña</a>`
        });

        res.send('Correo de recuperación enviado');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo de recuperación');
    }
});

router.get('/twilio', async (req, res) => {
    await client.messages.create({
        body: 'Probando Twilio',
        from: config.TWILIO_PHONE_NUMBER,
        to: '+542996109623'
    })
    res.send('Probando Twilio');
})

export default router;