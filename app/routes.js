// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumsPhotos } = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.get('/albums/:id/photos', getAlbumsPhotos);
};
