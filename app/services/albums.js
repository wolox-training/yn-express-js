const request = require('request-promise');

exports.getAlbumsApi = () =>
  request('https://jsonplaceholder.typicode.com/albums')
    .then(htmlString => JSON.parse(htmlString))
    .catch(error => {
      throw error;
    });

exports.getAlbumsPhotosApi = idAlbum =>
  request(`https://jsonplaceholder.typicode.com/photos?albumId=${idAlbum}`)
    .then(htmlString => JSON.parse(htmlString))
    .catch(error => {
      throw error;
    });
