import jwt from 'jsonwebtoken';

export function jwtValidation (req, res, next) {

    const token = req.cookies.token;
    const verifiedUser = jwt.verify(token, 'secretJWT');
    if (verifiedUser) {
        req.user = verifiedUser;
        next();
    } else {
        res.json({message: 'Authentication error'});
    }

    
    // const authHeader = req.get('Authorization');

    // //False si no se cumple condicion
    // const token = authHeader && authHeader.split(' ')[1];

    // if(!token) {
    //     return res.json({message: 'No Token'})
    // }

    // const isValidUser = jwt.verify(token, 'secretJWT');

    // if(isValidUser) {
    //     next();
    // } else {
    //     return res.json({message: 'User not valid'});
    // }

}