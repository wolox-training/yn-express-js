const { validationResult, check } = require('express-validator'),
  error = require('../errors'),
  logger = require('../logger'),
  servicesUser = require('../services/users');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(JSON.stringify(errors.errors[0]));
    next(error.validateUserError(errors.errors[0]));
  }
  next();
};

exports.isAdministratorMiddleware = [
  (req, res, next) => {
    const administrator = servicesUser.isAdministrator(req.header('Authorization'));
    if (administrator !== true) {
      throw error.databaseError('You do not have permissions to perform this operation');
    }
    return next();
  }
];

exports.validateTokenMiddleware = [
  check('Authorization')
    .not()
    .isEmpty()
    .withMessage('Authorization is required'),
  validateRequest,
  (req, res, next) => {
    servicesUser
      .validateToken(req.header('Authorization'))
      .then(next)
      .catch(next);
  }
];
