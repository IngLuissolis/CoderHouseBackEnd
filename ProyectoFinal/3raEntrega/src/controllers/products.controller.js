import { createProductService, getAllProductService, findOneProductService, deleteOneProductService } from '../services/products.service.js';

export const createProductController = async (req, res) => {
    const productObj = req.body;
    try {
        const newProduct = await createProductService(productObj);
        res.json({message: 'Product created successfully', product: newProduct});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProductService();
        res.json({message: 'Products', products});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}

export const findOneProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const productId = await findOneProductService(id);
        res.json({message: 'Product found', productId});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}

export const deleteOneProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const productId = await deleteOneProductService(id);
        res.json({message: 'Product delete'});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}