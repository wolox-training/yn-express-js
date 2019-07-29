const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger');

exports.createUser = userData =>
  User.create(userData)
    .then(result => {
      logger.info(`the user was created correctly: ${userData.name}`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('User already exists');
        throw error.signUpError('User already exists');
      }
      logger.error(`Could not create user: ${userData.name}`);
      throw error.databaseError(err.message);
    });

exports.validatePassword = data =>
  User.findOne({ where: { email: data.email }, attributes: ['email', 'password'] }).catch(errors => {
    logger.error(error);
    throw error.databaseError(errors.message);
  });
