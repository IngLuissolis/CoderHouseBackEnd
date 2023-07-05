import nodemailer from 'nodemailer';
import config from '../config.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
})

export const sendEmail = async (email, subject, message) => {
    try {
      const transporter = nodemailer.createTransport({
        // Configura el transporte de correo electrónico aquí (SMTP, Gmail, etc.)
        service: 'gmail',
        auth: {
            user: config.GMAIL_USER,
            pass: config.GMAIL_PASSWORD
        }
    });
  
      await transporter.sendMail({
        from: 'ingedusolis@gmail.com',
        to: email,
        subject: subject,
        text: message,
      });
  
      console.log(`Correo electrónico enviado a ${email}`);
    } catch (error) {
      console.error(`Error al enviar el correo electrónico a ${email}:`, error);
    }
  };