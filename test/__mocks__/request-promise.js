const logger = require('../../app/logger'),
  { albumPhotos } = require('../utils.test');

const album = {
  userId: 1,
  id: 1,
  title: 'Prueba de albums'
};

module.exports = jest.fn(url => {
  logger.info(url.uri);
  const photos = url.uri.search('photos');
  if (photos === -1) {
    return Promise.resolve(album);
  }
  return Promise.resolve(albumPhotos);
});
