import { Router } from "express";
//import ProductsManager from "../dao/fileManagers/productsManager.js";
import ProductsManager from '../dao/mongoManagers/productsManager.js';

const router = Router();
const productsManager = new ProductsManager();


//Cargar productos desde archivo a MongoAtlas
router.get('/create', async (req, res) => {
  await productsManager.createProductMongoAtlas();
  res.send('Productos guardados con exito');
})

//Metodo GET que realiza pagination
router.get('/pagination', async (req, res) => {
  //por default page = 1 y limit = 10
  const {page = 1, limit = 10} = req.query;
  const products = await productsManager.paginateProducts(limit, page);
  res.json({result: products});
})

//Metodo GET que realiza aggregate
router.get('/aggregate', async (req, res) => {
  const {grupo = 'GrupoA', orden1Precio} = req.query;
  const products = await productsManager.aggregateProducts(grupo, orden1Precio);
  res.json({result: products});
})

// router.get('/', async (req, res) => {
//   const { limit = 10, page = 1, sort, query } = req.query;
//   const products = await productsManager.getAllProducts(
//     parseInt(limit),
//     parseInt(page),
//     sort,
//     query
//   );
//   res.render('products', { products });
// })

router.get("/", async (req, res) => {
  const {page = 1, limit = 10, sort, query } = req.query;

  try {
    const productsDB = await productsManager.getAllProducts(limit, page, sort, query);

    const next = productsDB.hasNextPage ? 
      `http://localhost:3000/api/products?page=${productsDB.nextPage}` : null;
    const prev = productsDB.hasPrevPage ? 
      `http://localhost:3000/api/products?page=${productsDB.prevPage}` : null;

    //console.log('products: ', products.docs);

    const products = productsDB.docs;

    res.render('products', { products });

    // res.status(200).json({
    //   status: 'success',
    //   payload: productsDB.docs,
    //   info: {
    //     totalPages: productsDB.totalPages,
    //     prevPage: productsDB.hasPrevPag,
    //     nextPage: productsDB.hasNextPage,
    //     page: productsDB.page,
    //     hasNextPage: productsDB.hasNextPage,
    //     hasPrevPage: productsDB.hasPrevPage,
    //     prevLink: prev,
    //     nextLink: next}
    //   });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Ha ocurrido un error al obtener los productos",
      });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsManager.getProductById(id);
  if (product) {
    res.json({ product });
  } else {
    res.send("No existe producto en base de datos");
  }
});

router.post('/', async (req, res) => {
  const productInfo = req.body;
  const newProduct = await productsManager.createProduct(productInfo);
  res.json({messagge: 'Producto creado con Exito', newProduct});
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const productInfo = req.body;
  const updateProduct = await productsManager.updateProduct(id, productInfo);
  res.json({messagge: 'Producto modificado con Exito', updateProduct});
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const deleteProduct = await productsManager.deleteProduct(id);
  res.json({messagge: 'Producto eliminado con Exito', product: deleteProduct});
})

export default router;
