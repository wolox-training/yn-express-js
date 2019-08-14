const { factory } = require('factory-girl'),
  { User } = require('../app/models'),
  { Album } = require('../app/models'),
  config = require('../config'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  request = require('supertest'),
  app = require('../app');

exports.token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2' +
  'ljYUB3b2xveC5jbyIsImFkbWluaXN0cmF0b3IiOmZhbHNlLCJpYXQiO' +
  'jE1NjU3MjE3NzB9.jBqIUn1HEtH8III2yuKMo7GqKFY2pmG4vkVetXKkivQ';

exports.resultUserList = [
  {
    id: 1,
    name: 'yesica',
    lastName: 'nava',
    email: 'yesica@wolox.co',
    password: '$2a$10$2I6Lrhhs6cd7PNl10qV6YueEU8yL.2D1E4Y8BUG6Pja5sswhindG6',
    created_at: '2019-07-25T21:50:47.143Z',
    updated_at: '2019-07-25T21:50:47.143Z',
    deleted_at: null
  }
];

exports.testCreate = (email, password, dateToken) =>
  request(app)
    .post('/users')
    .send({ name: 'yesica', lastName: 'nava', email, password, dateToken })
    .set('Accept', 'application/json');

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
