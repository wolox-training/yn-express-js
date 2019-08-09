const logger = require('../../app/logger');

const album = {
  userId: 1,
  id: 1,
  title: 'Prueba de albums'
};

const albumPhotos = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

module.exports = jest.fn(url => {
  logger.info(url.uri);
  const photos = url.uri.search('photos');
  if (photos === -1) {
    return Promise.resolve(album);
  }
  return Promise.resolve(albumPhotos);
});
