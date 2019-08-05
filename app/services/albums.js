const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors'),
  config = require('../../config'),
  error = require('../errors'),
  urlApi = config.common.apiAlbums.url,
  { Album } = require('../models');

const upsert = userData =>
  Album.upsert(userData, { where: { id: userData.id } })
    .then(() => {
      logger.info('purchase made with success');
      return 'purchase made with success';
    })
    .catch(err => {
      logger.error('could not carry out the purchase');
      throw error.databaseError(err.message);
    });

const getAlbum = async url => {
  try {
    const result = await request(url);
    console.log(`result: ${result}`);
    return result;
  } catch (err) {
    throw error.signInError(err);
  }
};
exports.getAlbums = url => getAlbum(url);

exports.buyAlbums = req => {
  const source = `${urlApi}/albums/${req.params.id}`;
  const album = getAlbum(source);
  console.log(`album : ${album}`);
  if (!album) {
    throw errors.albumsApiError('Album does not exist');
  }
  console.log(album);
  const albumsUser = {
    id: 1,
    userId: 5,
    name: album.title
  };
  console.log(albumsUser);
  return upsert(albumsUser);
};
