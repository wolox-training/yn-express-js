const validateUser = require('../services/help/userValidate'),
  config = require('../../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  servicesUser = require('../services/users'),
  error = require('../errors');

exports.signUp = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(() => {
      res.status(201).send('the user was created correctly');
    })
    .catch(next);
};
