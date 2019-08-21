const servicesAlbums = require('../services/albums'),
  config = require('../../config'),
  { url } = config.common.apiAlbums;

exports.getAlbums = (req, res, next) => {
  const idAlbum = req.params.id;
  const source = idAlbum ? `${url}/albums/${idAlbum}` : `${url}/albums`;
  return servicesAlbums
    .getAlbumSources(source)
    .then(albums => res.status(200).send({ albums }))
    .catch(next);
};

exports.getAlbumsPhotos = (req, res, next) => {
  const idAlbum = req.params.id;
  const source = `${url}/photos?albumId=${idAlbum}`;
  return servicesAlbums
    .getAlbums(source)
    .then(albumsPhotos => res.status(200).send({ albumsPhotos }))
    .catch(next);
};

exports.buyAlbums = (req, res, next) =>
  servicesAlbums
    .buyAlbums(req)
    .then(albums => res.status(201).send(albums))
    .catch(next);
