import usersMongo from '../persistence/DAO/usersDAO/usersMongo.js';
import { hashPassword, generateToken } from '../utils.js';
import UsersDBDTO from '../persistence/DTO/usersDTO/usersDB.dto.js';
import UsersRespDTO from '../persistence/DTO/usersDTO/usersRes.dto.js';
import { createCartService } from './carts.service.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createUserService = async (user) => {
    const hashNewPassword = await hashPassword(user.password);
    const hashNewUser = {...user, password: hashNewPassword};
    const userDBDTO = new UsersDBDTO(hashNewUser);
    const newUser = await usersMongo.create(userDBDTO);
    const userResDTO = new UsersRespDTO(newUser);
    return userResDTO;
}

export const getAllUsersService = async () => {
    const users = await usersMongo.findAll();
    return users;
}

export const findOneUserService = async (id) => {
    const userId = await usersMongo.findOne(id);
    return userId;
}

export const deleteOneUserService = async (id) => {
    const userIdDelete = await usersMongo.deleteOne(id);
    return userIdDelete;
}

export const loginUserService = async (user) => {
  const loginUser = await usersMongo.loginUser(user);

  if (loginUser) {
    const token = generateToken(loginUser);
    const newCart = await createCartService({ products: [] });
    const cartId = newCart._id.toString();

    // Agregar el ID del carrito nuevo al arreglo "cart" del usuario
    loginUser.cart.push(cartId);

    // Actualizar la fecha de última conexión del usuario
    loginUser.last_connection = new Date();
    const updateUser = await usersMongo.updateOne(loginUser._id, loginUser);

    return { token, user: loginUser };
  } else {
    return null;
  }
};

export const updateUserService = async (id, user) => {
  const updateUser = await usersMongo.updateOne(id, user);
  return updateUser;
}

export const uploadDocumentsService = async (id, files) => {

  try {
    // Obtener el usuario por su ID
    const user = await usersMongo.findOne(id);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Procesar los archivos subidos
    for (const file of [...(files.document || []), ...(files.profileImage || []), 
      ...(files.productImage || [])]) {
      
      const { originalname, mimetype } = file;

      // Obtener la extensión del archivo
      const extension = path.extname(originalname);

      // Determinar la carpeta de destino según el tipo de archivo
      let folder = '';
      if (mimetype.includes('image')) {
        folder = 'profiles';
      } else if (mimetype.includes('application')) {
        folder = 'documents';
      } else {
        folder = 'products';
      }

      // Guardar el archivo en la carpeta correspondiente
      const filePath = path.join(__dirname, '..', 'uploads', folder, originalname);

      // Actualizar el estado del usuario para el documento subido
      user.documents.push({
        name: originalname,
        reference: filePath,
      });

    }

    // Guardar los cambios en el usuario
    const updateUser = await usersMongo.updateOne(id, user);
    return updateUser;
  } catch (error) {
    throw new Error('Error al subir los documentos');
  }
};