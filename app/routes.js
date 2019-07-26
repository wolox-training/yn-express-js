// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumsPhotos } = require('./controllers/albums');
const { signUp } = require('./controllers/users');
const { middlewareUsers } = require('./middlewares/users');
const { check } = require('express-validator');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.post(
    '/users',
    [
      check('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isAlphanumeric()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 8 })
        .withMessage('Must be at least 8 chars long'),
      check('name')
        .not()
        .isEmpty()
        .withMessage('name is required'),
      check('lastName')
        .not()
        .isEmpty()
        .withMessage('lastName is required'),
      check('email')
        .not()
        .isEmpty()
        .withMessage('email is required')
        .isEmail(),
      middlewareUsers
    ],
    signUp
  );
};
