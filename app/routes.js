// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumsPhotos } = require('./controllers/albums');
const { SignUp } = require('./controllers/users');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums/:id?', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
  app.post('/users', SignUp, () => 'error');
};
