const requireEmailAndPassword = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    const err = new Error('Los campos email y password son requeridos');
    return res.status(420).json({ data: err.message });
  }

  next();
};

module.exports = {
  requireEmailAndPassword,
};
