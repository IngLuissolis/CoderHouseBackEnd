import usersMongo from '../persistence/DAO/usersDAO/usersMongo.js';
import { hashPassword } from '../utils.js';
import UsersDBDTO from '../persistence/DTO/usersDTO/usersDB.dto.js';
import UsersRespDTO from '../persistence/DTO/usersDTO/usersRes.dto.js';

export const createUserService = async (user, res) => {
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