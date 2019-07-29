const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  secret = 'xxx';

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

// const findOneUser = data =>
//   User.findOne({ where: { email: data.email }, attributes: ['email', 'password'] }).catch(err => {
//     throw error.databaseError(err);
//   });

exports.signIn = data =>
  User.findOne({ where: { email: data.email }, attributes: ['email', 'password'] })
    .then(result => bcrypt.compare(data.password, result.password))
    .then(results => {
      if (results !== true) {
        throw error.signInError('email or password incorrect');
      }
      const bodyToken = {
        email: data.email
      };
      const token = jwt.encode(bodyToken, secret);
      return token;
    });
