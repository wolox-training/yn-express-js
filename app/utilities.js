const { factory } = require('factory-girl'),
  { User } = require('../app/models'),
  config = require('../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber));

factory.define(
  'User',
  User,
  {
    name: 'Prueba',
    lastName: 'primera',
    email: factory.seq('User.email', n => `user${n}@wolox.co`),
    password: 'prueba423',
    administrator: true
  },
  {
    afterCreate: model => {
      model.password = bcrypt.hashSync(model.password, salt);
      return model.save();
    }
  }
);

exports.factoryCreate = ({ name, lastName, email, password, administrator }) =>
  factory.create('User', { name, lastName, email, password, administrator }).then(user => user);
