import { createUserService, getAllUsersService, 
    findOneUserService, deleteOneUserService,
    loginUserService, updateUserService } from "../services/users.service.js";

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

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  try {
    if (email && password) {
      const result = await loginUserService(user);
      if (result && result.token) {
        console.log('User token', result.token);
        res.cookie("token", result.token, { httpOnly: true });
        res.cookie("user", JSON.stringify(result.user), { httpOnly: true });
        res.render("products");
      } else {
        res.redirect("/views/errorLogin");
      }
    } else {
      res.json({ message: "Email and password are required" });
    }
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const changeRoleController = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await findOneUserService(id);
    if (userId.role === "premium") {
      userId.role = 'user';
      const updateUser = await updateUserService(id, userId);
      res.json({message: 'Rol cambiado a user', updateUser});
    } else if (userId.role === "user") {
      userId.role = 'premium';
      const updateUser = await updateUserService(id, userId);
      res.json({message: 'Rol cambiado a premium', updateUser});
    } else {
      res.json({message: 'No es rol premium ni user'});
    }
  } catch (error) {
    res.json({message: 'Error', error});
  }
}