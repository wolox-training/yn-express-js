const { factory } = require('factory-girl'),
  { User } = require('../app/models'),
  { Album } = require('../app/models'),
  config = require('../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber));

factory.define(
  'User',
  User,
  {
    name: factory.chance('name'),
    lastName: factory.chance('last'),
    email: factory.chance('email', { domain: 'wolox.co' }),
    password: factory.chance('name'),
    administrator: factory.chance('bool')
  },
  {
    afterCreate: model => {
      model.password = bcrypt.hashSync(model.password, salt);
      return model.save();
    }
  }
);
factory.define('Album', Album, {
  albumId: 1,
  name: factory.chance('name'),
  userId: 1
});

exports.factoryCreate = data => factory.create('User', data);

exports.factoryCreateAlbums = data => factory.create('Album', data);
