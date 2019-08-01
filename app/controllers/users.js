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

exports.userList = (req, res, next) =>
  servicesUser
    .userList(req.query)
    .then(results => res.status(200).send(results))
    .catch(next);
