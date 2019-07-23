const logger = require('../logger'),
  validateUser = require('../services/help/userValidate'),
  bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10),
  servicesUser = require('../services/users'),
  error = require('../errors');

exports.SignUp = (req, res, next) => {
  const { name, lastName, email, password } = req.body,
    userData = { name, lastName, email, password },
    errors = validateUser.validateUser(userData);
  if (errors.length > 0) {
    logger.error(`Could not create user: ${userData.name}`);
    throw error.validateUser(errors);
  }
  userData.password = bcrypt.hashSync(password, salt);
  return servicesUser
    .existUser(userData.email)
    .then(result => {
      logger.info(result);
      if (result !== 0) {
        logger.error(`User already exists: ${userData.email}`);
        throw error.signUpError('User already exists');
      }
      return servicesUser
        .createUser(userData)
        .then(() => res.send(`the user was created correctly: ${userData.name}`))
        .catch(next);
    })
    .catch(next);
};
