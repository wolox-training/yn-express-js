const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors'),
  config = require('../../config'),
  error = require('../errors'),
  urlApi = config.common.apiAlbums.url,
  { User } = require('../models'),
  { Album } = require('../models');

const createAlbums = userData =>
  Album.create(userData)
    .then(() => `the album '${userData.name}' was purchased correctly`)
    .catch(err => {
      throw error.databaseError(err.message);
    });

const getAlbum = url => {
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
    .then(result => {
      let exist = false;
      if (result.count !== 0) {
        exist = true;
      }
      return exist;
    })
    .catch(err => {
      throw error.databaseError(err.message);
    });

exports.getAlbumsListByIdUser = userId =>
  Album.findAll({ where: { userId } })
    .then(result => result)
    .catch(err => {
      throw error.databaseError(err.message);
    });

const getUser = email =>
  User.findOne({
    where: { email },
    attributes: ['id']
  }).catch(err => {
    throw error.databaseError(err.message);
  });

exports.getAlbums = url => getAlbum(url);

exports.buyAlbums = async req => {
  try {
    const albumId = req.params.id,
      source = `${urlApi}/albums/${albumId}`,
      user = await getUser(req.body.decode.email),
      albums = await getAlbum(source);

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

exports.getAlbum = getAlbum;
exports.getUser = getUser;
