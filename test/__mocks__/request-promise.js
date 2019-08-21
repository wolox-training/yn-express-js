const logger = require('../../app/logger'),
  { albumPhotos, album } = require('../fixture/albumPhotos');

module.exports = jest.fn(url => {
  logger.info(url.uri);
  const photos = url.uri.search('photos');
  if (photos === -1) {
    return Promise.resolve(album);
  }
  return Promise.resolve(albumPhotos);
});
