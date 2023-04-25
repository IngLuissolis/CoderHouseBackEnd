export const login = async (req, res) => {
    res.render('login');
}

export const registro = async (req, res) => {
    res.render('registro');
}

export const errorRegistro = async (req, res) => {
    res.render('errorRegistro');
}

export const errorLogin = async (req, res) => {
    res.render('errorLogin');
}