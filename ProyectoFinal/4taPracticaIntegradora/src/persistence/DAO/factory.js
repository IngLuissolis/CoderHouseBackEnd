// import config from '../../config.js';
// import UsersFile from './usersDAO/usersFile.js';
// import UsersMongo from './usersDAO/usersMongo.js';
// //import UsersRepository from '../../repository/users.repository.js';
// import ProductsMongo from './productsDAO/productsMongo.js';

// let usersDAO;
// let productsDAO;

// console.log(config.PERSISTENCE);

// switch (config.PERSISTENCE) {
//     case 'MONGO':
//         await import('../mongo/mongoConfig.js');
// //        const {default: usersMongo} = await import('./usersDAO/usersMongo.js');
// //        usersDAO = new UsersRepository(usersMongo);
//         usersDAO = new UsersMongo();
//         productsDAO = new ProductsMongo();
//         break;
//     case 'FILE':
//         usersDAO = new UsersFile();
//         break;
// }

// //export default usersDAO;
// export async function getAllProducts() {
//     return await productsDAO.getAllProducts();
// }

// export async function getAllUsers() {
//     return await usersDAO.getAllUsers();
// }

// export async function createUser(user) {
//     return await usersDAO.createUser(user);
// }