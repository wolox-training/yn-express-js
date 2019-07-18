const request = require('request-promise');

exports.getAlbumsApi = () =>
  request('https://jsonplaceholder.typicode.com/albums')
    .then(htmlString => {
      console.log(htmlString);
    })
    .catch(error => {
      throw error;
    });
