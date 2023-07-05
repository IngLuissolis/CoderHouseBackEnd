// Middleware para verificar datos requeridos
export function checkRequiredFieldsProducts(req, res, next) {
  const missingFields = [];

  const data = {};
  Object.keys(req.body).forEach((key) => {
  data[key] = req.body[key];
  });

  //Verificacion si es nulo el valor de variables nombre y precio
  for (let key in data) {
    if (!data[key]) {
      console.log(`${key} tiene valor nulo`);
      missingFields.push(key);
    }
  }

  if (missingFields.length > 0) {
    const errorMessage = `Los siguientes campos son requeridos: ${missingFields.join(', ')}`;
    //return res.status(400).json({ message: errorMessage });
    return console.log(errorMessage);
  }

  next();
}