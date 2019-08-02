const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  configDevelopment = require('../../config'),
  { secret } = configDevelopment.common.jwt;

const upsert = userData =>
  User.upsert(userData, { where: { email: userData.email } })
    .then(result => {
      logger.info(`the user was update correctly: ${userData.name}`);
      return result;
    })
    .catch(err => {
      logger.error(`Could not update user: ${name}`);
      throw error.databaseError(err.message);
    });

exports.validateToken = ({ email }) =>
  User.findAndCountAll({ where: { email } }).then(result => {
    if (result.count !== 1) {
      throw error.validateTokenError('invalid Token ');
    }
  });

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

exports.signIn = async ({ email, password }) => {
  try {
    const result = await User.findOne({
      where: { email },
      attributes: ['email', 'password', 'administrator']
    });

    const compare = await bcrypt.compare(password, result.password);
    if (compare !== true) {
      throw error.signInError('email or password incorrect');
    }

    const bodyToken = {
      email,
      administrator: result.administrator
    };
    const token = jwt.encode(bodyToken, secret);
    return token;
  } catch (err) {
    throw error.signInError(err);
  }
};

exports.userList = ({ page = 0, pageSize = 5 }) => {
  const offset = pageSize * page,
    limit = pageSize;
  return User.findAll({ offset, limit })
    .then(result => result)
    .catch(err => {
      throw error.databaseError(err.message);
    });
};

exports.createUserAdmin = userData => {
  userData.administrator = true;
  return upsert(userData);
};
