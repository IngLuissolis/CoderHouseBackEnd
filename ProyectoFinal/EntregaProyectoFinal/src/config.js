import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    PERSISTENCE: process.env.PERSISTENCE || 'FILE',
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}