import { sendEmail } from '../utils/nodemailer.js';
import { findOneProductService } from '../services/products.service.js';

export const authorize = (allowedRoles) => {
    return (req, res, next) => {

      console.log('authorize.middleware userRole: ', req.cookies.user._doc.role);

      const userRole = req.cookies.user._doc; // Obtener el rol del usuario (asumiendo que está almacenado en req.user.role)

      //console.log('authorize.middleware:', allowedRoles)

      if (allowedRoles.includes(userRole.role)) {
        // El usuario tiene un rol permitido, continuar con la siguiente función de middleware
        next();
      } else {
        // El usuario no tiene un rol permitido, devolver respuesta de error de autorización
        res.status(403).json({ error: 'No tienes autorización para acceder a esta ruta.' });
      }
    };
  };

  export const authorizeDelete = (allowedRoles) => {

    return async (req, res, next) => {
      console.log('authorize.middleware userRole: ', req.cookies.user._doc.role);
      console.log('req: ', req.params.id);

      const productId = await findOneProductService(req.params.id);

      console.log('product Name: ', productId.nombre, ' - Owener: ', productId.owner);

      const userRole = req.cookies.user._doc; // Obtener el rol del usuario (asumiendo que está almacenado en req.user.role)

      console.log('userRole: ', userRole.email);

      if (userRole.email === productId.owner || userRole.email === 'admin') {
        console.log('Authorizado para borrar producto');
        // El usuario tiene un rol permitido, continuar con la siguiente función de middleware
        
        if (userRole.role === 'premium') {
          try {
            // Enviar el correo electrónico al usuario premium
            const userEmail = userRole.email; // Aquí debes obtener el correo electrónico del usuario premium
            const subject = 'Producto eliminado';
            const message = `El producto ${productId.nombre} ha sido eliminado.`;
            await sendEmail(userEmail, subject, message);
          } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
          }
        }

        next();
      } else {
        // El usuario no tiene un rol permitido, devolver respuesta de error de autorización
        res.status(403).json({ error: 'No tienes autorización para acceder a esta ruta.' });
      }

      
    }
  }