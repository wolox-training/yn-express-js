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
      logger.error(`Could not create user: ${userData.name}`);
      throw error.signUpError(err.message);
    });

exports.existUser = email =>
  User.findAndCountAll({ where: { email: `${email}` } })
    .then(result => result.count)
    .catch(err => {
      logger.error(err);
      throw error.albumsApiError(err.message);
    });
