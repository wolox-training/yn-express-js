const { validationResult } = require('express-validator'),
  error = require('../errors'),
  logger = require('../logger');
exports.middlewareUsers = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(JSON.stringify(errors));
    throw error.signUpError(errors.errors);
  }
  next();
};
