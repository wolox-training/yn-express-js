const request = require('supertest'),
  app = require('../app'),
  { factoryCreate, factoryCreateAlbums } = require('../test/utils.test'),
  dictum = require('dictum.js');

describe('album purchase', () => {
  it('should allow buy an album', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: true
    })
      .then(() => {
        const token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
          'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8';
        return request(app)
          .post('/albums/1')
          .set({ Accept: 'application/json', Authorization: token });
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("the album 'Prueba de albums' was purchased correctly");
        dictum.chai(response, 'should register with all the fields correctly');
        done();
      });
  });

  it('should allow buy an album', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: true
    })
      .then(() => {
        factoryCreateAlbums();
      })
      .then(() => {
        const token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
          'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8';
        return request(app)
          .post('/albums/1')
          .set({ Accept: 'application/json', Authorization: token });
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.message).toBe('you cannot buy this album again');
        done();
      });
  });
});
