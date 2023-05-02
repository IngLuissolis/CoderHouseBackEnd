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