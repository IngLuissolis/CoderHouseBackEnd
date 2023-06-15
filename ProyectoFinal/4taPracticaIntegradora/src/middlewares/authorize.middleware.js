export const authorize = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = JSON.parse(req.cookies.user); // Obtener el rol del usuario (asumiendo que está almacenado en req.user.role)
      //console.log('authorize.middleware userRole: ', userRole.role);
      //console.log('authorize.middleware:', allowedRoles)

      if (allowedRoles.includes(userRole.role)) {
        console.log('authorize true');
        // El usuario tiene un rol permitido, continuar con la siguiente función de middleware
        next();
      } else {
        // El usuario no tiene un rol permitido, devolver respuesta de error de autorización
        res.status(403).json({ error: 'No tienes autorización para acceder a esta ruta.' });
      }
    };
  };