const validateUser = require('../services/help/userValidate'),
  bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10),
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
      res.send('the user was created correctly');
    })
    .catch(next);
};
