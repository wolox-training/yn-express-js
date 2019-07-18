const servicesAlbums = require('../services/albums');

exports.getAlbums = (req, res) => res.status(200).send({ albums: servicesAlbums.getAlbumsApi() });
