const { healthCheck } = require('./controllers/healthCheck'),
  { getAlbums, getAlbumsPhotos, buyAlbums } = require('./controllers/albums'),
  { signUp, signIn, userList, signUpAdministrator, userAlbumsList } = require('./controllers/users'),
  {
    signUpMiddleware,
    signInMiddleware,
    validateTokenMiddleware,
    isAdministratorMiddleware
  } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.get('/users', validateTokenMiddleware, userList);
  app.get('/users/:user_id/albums', [validateTokenMiddleware], userAlbumsList);
  app.post('/users', signUpMiddleware, signUp);
  app.post('/users/sessions', signInMiddleware, signIn);
  app.post(
    '/admin/users',
    [signUpMiddleware, validateTokenMiddleware, isAdministratorMiddleware],
    signUpAdministrator
  );
  app.post('/albums/:id', [validateTokenMiddleware], buyAlbums);
};
