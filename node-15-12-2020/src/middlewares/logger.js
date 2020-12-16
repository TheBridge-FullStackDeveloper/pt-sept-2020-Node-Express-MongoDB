/**
 * Este middleware sirve para hacer un log con el método,
 * el endpoint y la fecha de la request.
 */
const logger = (req, res, next) => {
  const { method, originalUrl } = req;
  const date = new Date();

  console.log(`${method} ${originalUrl} - ${date}`);

  // Invocamos next para avanzar al siguiente middleware
  next();
};

module.exports = logger;
