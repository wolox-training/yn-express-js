/* eslint-disable func-names */
const servicesAlbums = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  servicesAlbums
    .getAlbumsApi()
    .then(albums => res.send({ albums }))
    .catch(() => next);

exports.getAlbumsPhotos = function(req, res, next) {
  const idAlbum = req.params.id;
  servicesAlbums
    .getAlbumsPhotosApi(idAlbum)
    .then(albums => res.send({ albums }))
    .catch(() => next);
};
