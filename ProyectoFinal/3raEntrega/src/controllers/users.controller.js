import { createUserService, getAllUsersService, findOneUserService, deleteOneUserService } from "../services/users.service.js";

export const createUserController = async (req, res) => {
    const userObj = req.body;
    try {
        const newUser = await createUserService(userObj);
        res.json({message: 'User created successfully', user: newUser});
    } catch (error) {
        res.json({message: 'Error', error});
    }

}

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.json({message: 'Users', users});       
    } catch (error) {
        res.json({message: 'Error', error});       
    }
}

export const findOneUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = await findOneUserService(id);
        res.json({message: 'User found', userId});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}

export const deleteOneUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = await deleteOneUserService(id);
        res.json({message: 'User delete'});
    } catch (error) {
        res.json({message: 'Error', error});
    }
}