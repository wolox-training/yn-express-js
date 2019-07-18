/* eslint-disable func-names */
const servicesAlbums = require('../services/albums');

exports.getAlbums = (req, res) => servicesAlbums.getAlbumsApi().then(albums => res.send({ albums }));

exports.getAlbumsPhotos = function(req, res) {
  const idAlbum = req.params.id;
  servicesAlbums.getAlbumsPhotosApi(idAlbum).then(albums => res.send({ albums }));
};
