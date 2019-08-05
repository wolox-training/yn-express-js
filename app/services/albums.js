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
    .then(() => `the album was created correctly '${userData.name}'`)
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('you cannot buy this album againn');
        throw error.buyAlbumsError('you cannot buy this album again');
      }
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

exports.getAlbums = url => getAlbum(url);

exports.buyAlbums = async req => {
  try {
    const source = `${urlApi}/albums/${req.params.id}`;
    const result = await User.findOne({
      where: { email: req.body.decode.email },
      attributes: ['id']
    });
    const albums = await getAlbum(source);
    if (!albums) {
      throw errors.buyAlbumsError('Album does not exist');
    }
    const albumsUser = {
      albumId: albums.id,
      userId: result.id,
      name: albums.title
    };
    return createAlbums(albumsUser);
  } catch (err) {
    throw error.buyAlbumsError(err);
  }
};
