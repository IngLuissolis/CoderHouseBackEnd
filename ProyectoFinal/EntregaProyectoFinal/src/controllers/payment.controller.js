import { createPaymentStripeService } from "../services/payment.service.js";

export const createPaymentController = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await createPaymentStripeService(+id);
        res.json({message: 'Success payment',payload: response});
    } catch (error) {
        res.send(error.message);
    }

}