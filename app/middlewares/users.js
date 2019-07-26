const { validationResult, check } = require('express-validator'),
  error = require('../errors'),
  logger = require('../logger');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors.errors);
    next(error.validateUser(errors));
  }
  next();
};

exports.signUpMiddleware = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required'),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('lastName is required'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .isEmail()
    .matches(/^(([^<>\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.(co|com|com.ar)\s*$/)
    .withMessage('email is not valid or does not belong to the wolox domain'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isAlphanumeric()
    .withMessage('Must be only alphanumeric chars')
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 chars long'),
  validateRequest
];
