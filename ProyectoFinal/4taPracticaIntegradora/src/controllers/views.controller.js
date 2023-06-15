import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
    res.render('login');
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
    //console.log('views.controller cid: ', cid);
    //console.log('views.controller req: ', req.cookies);
    res.redirect(`/carts/${cid}`);
    //res.render('cart');
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