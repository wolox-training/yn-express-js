const servicesAlbums = require('../services/albums'),
  config = require('../../config'),
  { url } = config.common.apiAlbums;

exports.getAlbums = (req, res, next) => {
  const idAlbum = req.params.id;
  const source = idAlbum ? `${url}/albums/${idAlbum}` : `${url}/albums`;
  return servicesAlbums
    .getAlbums(source)
    .then(albums => res.send({ albums }))
    .catch(next);
};

exports.getAlbumsPhotos = (req, res, next) => {
  const idAlbum = req.params.id;
  const source = `${url}/photos?albumId=${idAlbum}`;
  return servicesAlbums
    .getAlbums(source)
    .then(albumsPhotos => res.send({ albumsPhotos }))
    .catch(next);
};

exports.buyAlbums = (req, res, next) =>
  servicesAlbums
    .buyAlbums(req)
    .then(albums => res.send({ albums }))
    .catch(next);
