const config = require('../../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  servicesUser = require('../services/users');

exports.signUp = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(() => {
      res.status(201).send('the user was created correctly');
    })
    .catch(next);
};
exports.signIn = (req, res, next) =>
  servicesUser
    .signIn(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);

exports.userList = (req, res, next) => {
  const Authorization = req.header('Authorization');
  const validate = servicesUser.validateToken(Authorization);
  return servicesUser
    .validateEmail(req, validate)
    .then(result => result)
    .then(results => {
      res.status(200).send(results);
    })
    .catch(next);
};
