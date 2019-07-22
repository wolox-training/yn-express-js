const logger = require('../logger'),
  User = require('./models/users');

exports.SignUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastName: req.body.lastName
  });
  logger.info(`Hola ${user.email}-${user.password}-${user.name}-${user.lastName}`);
  return res.send('respond with a resource');
};
