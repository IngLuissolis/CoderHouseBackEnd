import usersMongo from '../persistence/DAO/usersDAO/usersMongo.js';
import { hashPassword, generateToken } from '../utils.js';
import UsersDBDTO from '../persistence/DTO/usersDTO/usersDB.dto.js';
import UsersRespDTO from '../persistence/DTO/usersDTO/usersRes.dto.js';
import { createCartService } from './carts.service.js';

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

    return { token, user: loginUser };
  } else {
    return null;
  }
};

export const updateUserService = async (id, user) => {
  const updateUser = await usersMongo.updateOne(id, user);
  return updateUser;
}