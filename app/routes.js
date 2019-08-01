const { healthCheck } = require('./controllers/healthCheck'),
  { getAlbums, getAlbumsPhotos } = require('./controllers/albums'),
  { signUp, signIn, userList } = require('./controllers/users'),
  { signUpMiddleware, signInMiddleware, validateTokenMiddleware } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.get('/users', validateTokenMiddleware, userList);
  app.post('/users', signUpMiddleware, signUp);
  app.post('/users/sessions', signInMiddleware, signIn);
};
