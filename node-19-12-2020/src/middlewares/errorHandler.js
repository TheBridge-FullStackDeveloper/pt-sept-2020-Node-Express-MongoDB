const errorHandler = (error, req, res, next) => {
  console.log(error);

  const { code, message } = error;
  res.status(code || 500).json(message);
};

module.exports = errorHandler;
