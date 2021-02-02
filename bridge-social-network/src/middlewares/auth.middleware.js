const { throwError } = require('../utils/common.utils');

function isLoggedIn(req, res, next) {
  return req.user ? next() : throwError('Unauthorized', 401)(next);
}

module.exports = {
  isLoggedIn,
};
