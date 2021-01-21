const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    const err = new Error('No autorizado');
    return res.status(401).json({ data: err.message });
  }

  next();
};

module.exports = isAuthenticated;
