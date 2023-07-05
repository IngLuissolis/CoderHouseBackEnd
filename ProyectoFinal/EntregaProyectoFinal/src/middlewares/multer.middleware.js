import multer from 'multer';
import path from 'path';

// Configuración de destino y nombre de archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determinar la carpeta de destino según el tipo de archivo
     if (file.fieldname == 'profileImage') {
      cb(null, 'src/uploads/profiles');
    } else if (file.fieldname == 'productImage') {
      cb(null, 'src/uploads/products');
    } else if (file.fieldname === 'document') {
      cb(null, 'src/uploads/documents');
    } else {
      cb(null, 'uploads');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Validación del tipo de archivo
const fileFilter = (req, file, cb) => {
  // Verificar el tipo de archivo permitido
  const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido'));
  }
};

// Configuración del middleware de Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;