const errorHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).send(error.message);
};

module.exports = errorHandler;
