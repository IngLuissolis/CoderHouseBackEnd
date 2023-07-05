import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
    res.render('login');
}

export const loginPFAdminController = async (req, res) => {
    const mensaje = req.query.message; // Obtener el valor de 'message' de la URL

    res.render('loginPFAdmin', {mensaje}); // Renderizar la plantilla 'viewsLoginPF' y pasar el valor de 'message'
}

export const registroController = async (req, res) => {
    res.render('registro');
}

export const errorRegistroController = async (req, res) => {
    res.render('errorRegistro');
}

export const errorLoginController = async (req, res) => {
    res.render('errorLogin');
}

export const addProductController = async (req, res) => {
    res.render('addProduct');
}

export const cartController = async (req, res) => {
    const { cid } = req.params;
    res.redirect(`/api/carts/${cid}`);
}

export const linkReestablecerController = async (req, res) => {
    const { token } = req.params;
    try {
        // Verificar el token
        jwt.verify(token, 'SECRETO_DEL_TOKEN', (err, decoded) => {
            if (err) {
                // Si ocurre un error, el token ha expirado o es inválido
                console.error('Error al verificar el token:', err);
                res.redirect('/views'); // Redirige a login
            } else {
                // El token es válido y no ha expirado
                // Renderizar la página de restablecimiento de contraseña
                res.render('linkReestablecer');
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const allUsersController = async (req, res) => {
    res.render('allUsers');
}


export const loginProductsController = async (req, res) => {

    const products = req.cookies.products;

    //console.log('views.Controller products: ', JSON.parse(products));

    const user = req.cookies.user;

    //console.log('views.controller: ', user);

    res.render('products', {user, products});
}