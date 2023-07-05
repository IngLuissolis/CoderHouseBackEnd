import usersMongo from '../persistence/DAO/usersDAO/usersMongo.js';
import { hashPassword, generateToken } from '../utils.js';
import UsersDBDTO from '../persistence/DTO/usersDTO/usersDB.dto.js';
import UsersRespDTO from '../persistence/DTO/usersDTO/usersRes.dto.js';
import { createCartService } from './carts.service.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
//
import { sendEmail } from '../utils/nodemailer.js';

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

//Delete Users con ultima conexion mayor a 2 dias
export const inactiveUsersService = async () => {
  const users = await usersMongo.findAll();
  
  // Obtiene la fecha actual y resta 2 días (o el intervalo de tiempo deseado)
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);

  const inactiveUsers = users.filter((user) => {
    // Comprueba si la última conexión del usuario es anterior a la fecha actual
    console.log('user: ', user.email, ' - last connection: ', user.last_connection);
    return user.last_connection < currentDate;
  });

  const deletedUsers = [];

  for (const user of inactiveUsers) {
    //console.log('deleting user: ', user);
    // Elimina el usuario de la base de datos
    //await usersMongo.delete(user._id);

    // Envía el correo electrónico al usuario eliminado por inactividad
    const subject = "Eliminación de cuenta por inactividad";
    const message = `Estimado/a ${user.first_name},\n\nTu cuenta ha sido eliminada debido a la inactividad. Si deseas volver a utilizar nuestros servicios, por favor regístrate nuevamente.\n\nSaludos,\nEquipo del sitio eCommerce`;
    sendEmail(user.email, subject, message);

    deletedUsers.push(user);
  }

  return deletedUsers;
}

export const loginUserService = async (user) => {
  const loginUser = await usersMongo.loginUser(user);

  if (loginUser) {
    const token = generateToken(loginUser);
    const newCart = await createCartService({ products: [] });
    const cartId = newCart._id.toString();

    // Vaciar el arreglo "cart" del usuario antes de agregar el nuevo carrito
    loginUser.cart = [];

    // Agregar el ID del carrito nuevo al arreglo "cart" del usuario
    loginUser.cart.push(cartId);
    //loginUser.cart = cartId;

    //console.log('users.service: ', loginUser);

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