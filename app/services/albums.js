const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors'),
  config = require('../../config'),
  error = require('../errors'),
  urlApi = config.common.apiAlbums.url,
  { Album } = require('../models'),
  servicesUser = require('../services/users');

const createAlbums = albumData =>
  Album.create(albumData)
    .then(() => `the album '${albumData.name}' was purchased correctly`)
    .catch(err => {
      throw error.databaseError(err.message);
    });

exports.getAlbumSources = url => {
  const options = {
    uri: url,
    json: true
  };

  return request(options).catch(err => {
    logger.error(err);
    throw errors.albumsApiError(err.message);
  });
};

const albumPurchased = (albumId, userId) =>
  Album.findAndCountAll({
    where: { albumId, userId },
    attributes: ['id']
  })
    .then(result => result.count !== 0)
    .catch(err => {
      throw error.databaseError(err.message);
    });

exports.getAlbumsListByIdUser = userId =>
  Album.findAll({ where: { userId } })
    .then(result => result)
    .catch(err => {
      throw error.databaseError(err.message);
    });

exports.buyAlbums = async req => {
  try {
    const albumId = req.params.id,
      source = `${urlApi}/albums/${albumId}`,
      user = await servicesUser.getUser(req.body.decode.email),
      albums = await exports.getAlbumSources(source);
    if (!albums) {
      throw errors.buyAlbumsError('Album does not exist');
    }
    const purchasedAlbum = await albumPurchased(albumId, user.id);
    if (purchasedAlbum !== false) {
      throw errors.buyAlbumsError('you cannot buy this album again');
    }
    return createAlbums({
      albumId: albums.id,
      userId: user.id,
      name: albums.title
    });
  } catch (err) {
    throw error.buyAlbumsError(err);
  }
};
