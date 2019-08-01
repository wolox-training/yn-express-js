const { healthCheck } = require('./controllers/healthCheck'),
  { getAlbums, getAlbumsPhotos } = require('./controllers/albums'),
  { signUp, signIn, userList, signUpAdministrator } = require('./controllers/users'),
  { signUpMiddleware, signInMiddleware } = require('./middlewares/users'),
  { validateTokenMiddleware, isAdministratorMiddleware } = require('./middlewares/general');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.get('/users', validateTokenMiddleware, userList);
  app.post('/users', signUpMiddleware, signUp);
  app.post('/users/sessions', signInMiddleware, signIn);
  app.post(
    '/admin/users',
    [signUpMiddleware, validateTokenMiddleware, isAdministratorMiddleware],
    signUpAdministrator
  );
};
