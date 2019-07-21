const servicesAlbums = require('../services/albums'),
  logger = require('../logger'),
  config = require('../../config'),
  { url } = config.common.ApiAlbums;
let source = url;

exports.getAlbums = (req, res, next) => {
  const idAlbum = req.params.id;
  logger.info(`${url}/albums/${idAlbum}`);
  source = idAlbum === undefined ? `${url}/albums` : `${url}/albums/${idAlbum}`;
  return servicesAlbums
    .getAlbums(source)
    .then(albums => res.send({ albums }))
    .catch(next);
};

exports.getAlbumsPhotos = (req, res, next) => {
  const idAlbum = req.params.id;
  source = `${url}/photos?albumId=${idAlbum}`;
  return servicesAlbums
    .getAlbums(source)
    .then(albumsPhotos => res.send({ albumsPhotos }))
    .catch(next);
};
