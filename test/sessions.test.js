const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js'),
  { factoryCreate, token } = require('../test/utils.test');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('disable all sessions', () => {
  it('should disable all active sessions', done => {
    factoryCreate({
      name: 'sofia',
      lastName: 'arismendy',
      email: 'sofia@wolox.co',
      password: 'yuli35624',
      administrator: true
    }).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: 'sofia@wolox.co', password: 'yuli35624' })
        .set('Accept', 'application/json')
        .then(response => {
          request(app)
            .post('/users/sessions/invalidate_all')
            .set({ Accept: 'application/json', Authorization: response.body.token })
            .then(result => {
              expect(result.statusCode).toBe(200);
              expect(result.text).toBe('all sessions were properly disabled');
              dictum.chai(result, 'should disable all active sessions');
              done();
            });
        })
    );
  });

  it('should not disable all active sessions', done => {
    factoryCreate({
      name: 'sofia',
      lastName: 'arismendy',
      email: 'sofia@wolox.co',
      password: 'yuli35624',
      administrator: true,
      dateToken: null
    }).then(() =>
      request(app)
        .post('/users/sessions/invalidate_all')
        .set({ Accept: 'application/json', Authorization: token })
        .then(result => {
          expect(result.statusCode).toBe(503);
          expect(result.body.message).toBe('invalid Token ');
          done();
        })
    );
  });
});

describe('sessions expires', () => {
  it('should not start navigation because the token expired', done => {
    factoryCreate({
      name: 'sofia',
      lastName: 'arismendy',
      email: 'sofia@wolox.co',
      password: 'yuli35624',
      administrator: true
    }).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: 'sofia@wolox.co', password: 'yuli35624' })
        .set('Accept', 'application/json')
        .then(response => {
          delay(3000).then(() => {
            request(app)
              .get('/users/albums/1/photos')
              .set({ Accept: 'application/json', Authorization: response.body.token })
              .then(result => {
                expect(result.statusCode).toBe(503);
                expect(result.body.message).toBe('the token has expired');
                done();
              });
          });
        })
    );
  });
});
