const logger = require('../logger');
//  User = require('../models/user');

exports.SignUp = (req, res) => {
  // const users = new User({
  //   email: req.body.email,
  //   lastName: req.body.lastName,
  //   name: req.body.name,
  //   password: req.body.password
  // });
  logger.info(`Hola ${req.body.email}-${req.body.name}-${req.body.password}-${req.body.lastName}`);
  return res.send('hola');
};
