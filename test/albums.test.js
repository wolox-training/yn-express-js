const request = require('supertest'),
  app = require('../app'),
  { factoryCreate, factoryCreateAlbums, token } = require('../test/utils.test'),
  dictum = require('dictum.js');

const responseAlbumsList = [
  {
    id: 1,
    albumId: 1,
    name: 'eaque aut omnis a',
    userId: 1,
    created_at: '2019-08-12T14:55:55.503Z',
    deleted_at: null
  }
];

describe('album purchase', () => {
  it('should allow buy an album', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: true
    })
      .then(() =>
        request(app)
          .post('/albums/1')
          .set({ Accept: 'application/json', Authorization: token })
      )
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("the album 'Prueba de albums' was purchased correctly");
        dictum.chai(response, 'should register with all the fields correctly');
        done();
      });
  });

  it('should not allow buy an album', done => {
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
      .then(() =>
        request(app)
          .post('/albums/1')
          .set({ Accept: 'application/json', Authorization: token })
      )
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('you cannot buy this album again');
        done();
      });
  });
});

describe('user Albums List', () => {
  it('should user Albums List', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: true
    })
      .then(() => {
        factoryCreateAlbums({ name: 'eaque aut omnis a' });
      })
      .then(() =>
        request(app)
          .post('/users/sessions')
          .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set('Accept', 'application/json')
          .then(response => {
            request(app)
              .get('/users/1/albums')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                responseAlbumsList[0].updated_at = result.body[0].updated_at;
                expect(result.statusCode).toBe(200);
                expect(result.body).toEqual(responseAlbumsList);
                done();
              });
          })
      );
  });

  it('should not get user Albums List', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: false
    })
      .then(() => {
        factoryCreateAlbums({ name: 'eaque aut omnis a' });
      })
      .then(() =>
        request(app)
          .post('/users/sessions')
          .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set('Accept', 'application/json')
          .then(response => {
            request(app)
              .get('/users/3/albums')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                expect(result.statusCode).toBe(400);
                expect(result.body.message).toBe('you can only see your albums');
                done();
              });
          })
      );
  });
});
