const logger = require('../../logger');

const album = {
  userId: 1,
  id: 1,
  title: 'Prueba de albums'
};
module.exports = jest.fn(url => {
  logger.info(url);
  return Promise.resolve(album);
});
