const request = require('supertest'),
  app = require('../app');

describe('POST /user', () => {
  it('signUp User', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });
  it('validate email', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it('validate password', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'err*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it('validate required fields', done => {
    request(app)
      .post('/users')
      .send({ name: '', lastName: '', email: '', password: '' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
