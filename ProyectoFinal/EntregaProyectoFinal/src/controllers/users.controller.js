import { createUserService, getAllUsersService, 
    findOneUserService, deleteOneUserService,
    loginUserService, updateUserService,
   uploadDocumentsService, inactiveUsersService } from "../services/users.service.js";

import { getAllProductService } from "../services/products.service.js";

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

//
export const inactiveUsersController = async (req, res) => {
  try {
    const users = await inactiveUsersService();
    res.json({ message: "Users", users });
  } catch (error) {
    res.json({ message: "Error", error });
  }
}

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };

  //console.log('user: ', user);

  try {
    if (email && password) {
      const result = await loginUserService(user);

      const products = await getAllProductService();

      //console.log('users.Controller products: ', products);

      //user = JSON.stringify(result.user);
      //products = JSON.stringify(products);

      if (result && result.token) {
        res.cookie("token", result.token, { httpOnly: true });

        //const latestCart = result.user.cart;

        res.cookie("user", {
          ...result.user,
        }, { httpOnly: true });

        res.cookie("products", {
          ...products,
        }, { httpOnly: true });

        res.redirect(`/api/views/loginProducts`);
        // Redireccionar a la ruta '/api/views/loginProducts' con los datos de products
        //res.redirect("/api/views/loginProducts?products=" + JSON.stringify(products));

        } else {
        res.redirect("/api/views/errorLogin");
      }
    } else {
      res.json({ message: "Email and password are required" });
    }
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export const loginPFAdminController = async (req, res) => {
  const email = req.body.emailPF;
  const password = req.body.passwordPF;
  const user = { email, password };

  try {
    const result = await loginUserService(user);
    if(result.user.role === 'admin')
    {
      console.log("ingreso usuario con rol administrador");
      res.redirect(`/api/views/viewsLoginPF?message=${(result.user.first_name)}`); // Redireccionar a la página '/api/views/viewsLoginPF' y enviar los datos de result
      //res.redirect(`/api/views/viewsLoginPF`);
      //res.json({ message: result});
    }
    else {
      console.log(`ingreso usuario con rol ${result.user.role}`);
    }
  } catch (error) {
    res.json({ message: "Error", error });
  }
}

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

export const uploadDocumentsController = async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  try {
    // Llamar al servicio para manejar la lógica de actualización del usuario y procesamiento de los documentos
    await uploadDocumentsService(id, files);

    res.status(200).json({ message: 'Documentos subidos correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir los documentos' });
  }
}

export const editRoleUserController = async (req, res) => {
  const { id }  = req.params;
  console.log('Edit role user', id);
  try {
    res.status(200).json({ message: 'Usuario actualizado role' }); 
  } catch (error) {
    res.json({message: 'Error', error});
  }

}