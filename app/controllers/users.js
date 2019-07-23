const logger = require('../logger'),
  validateUser = require('../services/help/userValidate'),
  { User } = require('../models'),
  bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10),
  error = require('../errors');

exports.SignUp = (req, res) => {
  const { name, lastName, email, password } = req.body,
    userData = { name, lastName, email, password },
    errors = validateUser.validateUser(userData);

  if (errors.length > 0) {
    logger.info('entro aqui 1');
    return res.status(400).json({ errors });
  }
  logger.info('entro aqui 2');
  userData.password = bcrypt.hashSync(password, salt);
  User.findAndCountAll({ where: { email: `${userData.email}` } })
    .then(result => {
      logger.info(result.count);
      if (result.count === 0) {
        return User.create(userData)
          .then(() => logger.info(`se creo correctamente el usuario: ${userData.name}`))
          .catch(err => {
            logger.error(`no se pudo crear el usuario: ${userData.name}`);
            throw error.signUpError(err.message);
          });
      }
      return res.end();
    })
    .catch(err => {
      throw error.signUpError(err.message);
    });
  return res.end();
};
