//middleware, estos se deben colocar antes que se ejecuten las peticiones
export const validarUsuario1 = (req, res, next) => {
    const usuario = req.body;
    if(usuario.nombre === 'Luis'){
        res.send('Tu no estas habilitado');
    } else {
        next();
    }

}