export const authorize = (roles) => {
    return (req, res, next) => {
      const user = JSON.parse(req.cookies.user);
      console.log('authorize.middleware user.role: ',user.role);
  
      if (!user || !user.role) {
        // Si la cookie no es válida, redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error.
        return res.status(401).send('Unauthorized');
      }
  
      if (!roles.includes(user.role)) {
        // Si el rol de usuario no tiene acceso al endpoint, denegar el acceso.
        return res.status(403).send('Usuario con rol sin acceso para crear Producto');
      }
  
      // Si el rol de usuario tiene acceso al endpoint, continuar con la siguiente función middleware.
      next();
    };
  };