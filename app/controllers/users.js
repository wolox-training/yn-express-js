const config = require('../../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  servicesUser = require('../services/users'),
  jwt = require('jwt-simple'),
  secret = 'xxx',
  errors = require('../errors');

exports.signUp = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(() => {
      res.status(201).send('the user was created correctly');
    })
    .catch(next);
};
exports.signIn = (req, res, next) => {
  servicesUser
    .validatePassword(req.body)
    .then(result => {
      bcrypt.compare(req.body.password, result.password, (err, results) => {
        if (results !== true) {
          next(errors.signUpError('email and password incorrect'));
        }
        const bodyToken = {
          email: req.body.email,
          password: result.password
        };
        const token = jwt.encode(bodyToken, secret);
        res.end(token);
      });
    })
    .catch(next);
};
