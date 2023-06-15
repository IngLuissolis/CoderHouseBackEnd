import jwt from 'jsonwebtoken';

export function jwtValidation (req, res, next) {
    const token = req.cookies.token || '';
    const verifiedUser = jwt.verify(token, 'secretJWT');
    if (verifiedUser) {
        req.user = verifiedUser;
        next();
    } else {
        res.json({message: 'Authentication error'});
    }
}