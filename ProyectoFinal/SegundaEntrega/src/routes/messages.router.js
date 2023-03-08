import { Router } from "express";
import MessagesManager from '../dao/mongoManagers/messagesManager.js';

const router = Router();
const messagesManager = new MessagesManager();

router.get('/', async (req, res) => {
    const messages = await messagesManager.getAllMessages();
  if (messages.length === 0) {
    res.json({messagge: 'No hay mensajes guardados'});
  } else {
    res.json({messagge: 'Mensajes guardados en MongoDB', messages: messages});
  }
})

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  const message = await messagesManager.getMessageById(id);
  if (message) {
    res.json({ message: message });
  } else {
    res.send("No existe mensaje en base de datos");
  }
})

export default router;