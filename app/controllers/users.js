const validateUser = require('../services/help/userValidate'),
  config = require('../../config'),
  bcrypt = require('bcryptjs'),
  { magicNumberTen } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(magicNumberTen)),
  servicesUser = require('../services/users'),
  error = require('../errors');

exports.signUp = (req, res, next) => {
  const errors = validateUser.validateUser(req);
  if (errors.length > 0) {
    throw error.validateUser(errors);
  }
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(() => {
      res.status(201).send('the user was created correctly');
    })
    .catch(next);
};
