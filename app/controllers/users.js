const logger = require('../logger'),
  User = require('../models/user');

exports.SignUp = (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  User.create({
    name,
    lastName,
    email,
    password
  })
    .then(user => res.json(user))
    .catch(next);
  logger.info(`Hola ${req.body.email}-${req.body.name}-${req.body.password}-${req.body.lastName}`);
};
