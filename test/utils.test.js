const { factory } = require('factory-girl'),
  { User } = require('../app/models'),
  { Album } = require('../app/models'),
  config = require('../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  request = require('supertest'),
  app = require('../app');

exports.testCreate = (email, password) =>
  request(app)
    .post('/users')
    .send({ name: 'yesica', lastName: 'nava', email, password })
    .set('Accept', 'application/json');

exports.albumPhotos = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

exports.responseAlbumsList = [
  {
    id: 1,
    albumId: 1,
    name: 'eaque aut omnis a',
    userId: 1
  }
];

exports.albumPhotos = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

factory.define(
  'User',
  User,
  {
    name: factory.chance('name'),
    lastName: factory.chance('last'),
    email: factory.chance('email', { domain: 'wolox.co' }),
    password: factory.chance('alphaNumeric'),
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
