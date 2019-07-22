const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors');

exports.getAlbums = url =>
  request(url).catch(error => {
    logger.error(error);
    throw errors.albumsApiError(error.message);
  });
