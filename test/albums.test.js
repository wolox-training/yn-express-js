const request = require('supertest'),
  app = require('../app'),
  { factoryCreate, factoryCreateAlbums, token } = require('../test/utils.test'),
  dictum = require('dictum.js');

const responseAlbumsList = [
  {
    id: 1,
    albumId: 9,
    name: 'eaque aut omnis a',
    userId: 1
  }
];

const albumPhotos = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

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
                expect(result.statusCode).toBe(200);
                expect(response.text).toString(responseAlbumsList);
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
                done();
              });
          })
      );
  });
});

describe('list of user albums photos', () => {
  it('should list the photos of the albums of a user', done => {
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
          .post('/users/sessions')
          .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set('Accept', 'application/json')
          .then(response => {
            request(app)
              .get('/users/albums/1/photos')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                expect(result.statusCode).toBe(200);
                expect(response.text).toString(albumPhotos);
                done();
              });
          })
      );
  });

  it('should not list the photos of the albums of a user', done => {
    factoryCreate({
      name: 'yesica',
      lastName: 'nava',
      email: 'yesica@wolox.co',
      password: 'shdfgs345',
      administrator: false
    })
      .then(() => {
        factoryCreateAlbums();
      })
      .then(() =>
        request(app)
          .post('/users/sessions')
          .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set('Accept', 'application/json')
          .then(response => {
            request(app)
              .get('/users/albums/8/photos')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                expect(result.statusCode).toBe(400);
                expect(result.body.message).toBe("you can't see the photos from this album");
                done();
              });
          })
      );
  });

  it('should not allow lists of photos from any albums of an administrator user', done => {
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
          .post('/users/sessions')
          .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set('Accept', 'application/json')
          .then(response => {
            request(app)
              .get('/users/albums/9/photos')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                expect(result.statusCode).toBe(400);
                expect(result.body.message).toBe("you can't see the photos from this album");
                done();
              });
          })
      );
  });
});
