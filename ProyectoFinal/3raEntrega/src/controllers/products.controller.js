import { createProductService, getAllProductService, 
    findOneProductService, deleteOneProductService,
    updateProductService } from '../services/products.service.js';

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
        const user = JSON.parse(req.cookies.user);
        const products = await getAllProductService();
        res.render('products', {products, user});
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

export const updateOneProductController = async (req, res) => {
    const { id } = req.params;
    const productObj = req.body;
    try {
      // Obtener información actual del producto
      const product = await findOneProductService(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Actualizar información del producto
      const updatedProduct = await updateProductService(id, productObj);
  
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  }