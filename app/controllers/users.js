const logger = require('../logger'),
  validateUser = require('../services/help/userValidate'),
  { User } = require('../models'),
  bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10),
  error = require('../errors');

exports.SignUp = (req, res, next) => {
  const { name, lastName, email, password } = req.body,
    userData = { name, lastName, email, password },
    errors = validateUser.validateUser(userData);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  userData.password = bcrypt.hashSync(password, salt);
  return User.findAndCountAll({ where: { email: `${userData.email}` } })
    .then(result => {
      if (result.count !== 0) {
        logger.error(`User already exists: ${userData.email}`);
        throw error.signUpError('User already exists');
      }
      return User.create(userData)
        .then(() => {
          logger.info(`the user was created correctly: ${userData.name}`);
          res.send(`the user was created correctly: ${userData.name}`);
        })
        .catch(err => {
          logger.error(`Could not create user: ${userData.name}`);
          throw error.signUpError(err.message);
        });
    })
    .catch(next);
};
