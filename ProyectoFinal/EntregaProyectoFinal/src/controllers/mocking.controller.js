import { generateProductsMockingService } from '../services/mocking.service.js';

export const generateProductsMockingController = async (req, res) => {
    const products = generateProductsMockingService();
    res.json({products});
}