import { createProductService, getAllProductService, 
    findOneProductService, deleteOneProductService,
    updateProductService } from '../services/products.service.js';

export const createProductController = async (req, res) => {
    const productObj = req.body;

    const user = req.cookies.user._doc;

    try {
        const newProduct = await createProductService(productObj, user);
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

    const user = req.cookies.user._doc;
    const { id } = req.params;
    const userRole = user.role;
    const userEmail = user.email;

    //console.log('Products Controller:', userRole, ' - ', userEmail);

    const productId = await findOneProductService(id);
    const productOwner = productId.owner; // Función para obtener el propietario del producto

    try {
        if (userRole === 'admin' || (userRole === 'premium' && productOwner === userEmail)) {
            // El admin puede borrar cualquier producto o un usuario premium solo puede borrar su propio producto
            const productIdDelete = await deleteOneProductService(id);

            //
            const products = await getAllProductService();

            res.json({ message: 'Producto eliminado correctamente.' , products});
          } else {
            res.status(403).json({ error: 'No tienes autorización para eliminar este producto.' });
          }

        //const productId = await deleteOneProductService(id);
        //res.json({message: 'Product delete'});
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