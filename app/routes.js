const { healthCheck } = require('./controllers/healthCheck'),
  { getAlbums, getAlbumsPhotos } = require('./controllers/albums'),
  { signUp } = require('./controllers/users'),
  { signUpMiddleware } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.post('/users', signUpMiddleware, signUp);
};
