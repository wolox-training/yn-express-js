const { validationResult, check } = require('express-validator'),
  error = require('../errors'),
  logger = require('../logger'),
  servicesUser = require('../services/users'),
  jwt = require('jwt-simple'),
  configDevelopment = require('../../config'),
  { secret } = configDevelopment.common.jwt;

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors.errors[0]);
    next(error.validateUserError(errors.errors[0]));
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

exports.signInMiddleware = [
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
    .withMessage('password is required'),
  validateRequest
];

exports.isAdministratorMiddleware = [
  (req, res, next) => {
    if (req.body.decode.administrator !== true) {
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
    req.body.decode = jwt.decode(req.header('Authorization'), secret);
    return servicesUser
      .validateToken(req.body.decode)
      .then(next)
      .catch(next);
  }
];
