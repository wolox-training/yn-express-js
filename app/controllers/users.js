const bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10),
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
