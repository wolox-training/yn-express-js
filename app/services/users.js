const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  config = require('../../config'),
  { secret } = config.common.jwt;

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

exports.signIn = ({ email, password }) =>
  User.findOne({ where: { email }, attributes: ['email', 'password'] })
    .then(result => bcrypt.compare(password, result.password))
    .then(results => {
      if (results !== true) {
        throw error.signInError('email or password incorrect');
      }
      const bodyToken = {
        email
      };
      const token = jwt.encode(bodyToken, secret);
      return token;
    });

exports.validateEmail = email =>
  User.findAndCountAll({ where: { email } }).then(result => {
    let exist = false;
    if (result.count === 1) {
      exist = true;
    }
    return exist;
  });

exports.validateToken = Authorization => {
  const decoded = jwt.decode(Authorization, secret);
  return decoded.email;
};
