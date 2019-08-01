const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  configDevelopment = require('../../config'),
  { secret } = configDevelopment.common.jwt;

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

exports.userList = ({ page = 0, pageSize = 5 }) => {
  const offset = pageSize * page,
    limit = pageSize;
  return User.findAll({ offset, limit })
    .then(result => result)
    .catch(err => {
      throw error.databaseError(err.message);
    });
};

exports.validateToken = Authorization => {
  const { email } = jwt.decode(Authorization, secret);
  return User.findAndCountAll({ where: { email } }).then(result => {
    if (result.count !== 1) {
      throw error.validateTokenError('invalid Token ');
    }
  });
};
