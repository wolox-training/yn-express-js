const request = require('supertest'),
  app = require('../app');
describe('', () => {
  it('signUp User', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.text).toBe('the user was created correctly');
        done();
      });
  });
  it('validate email', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.body.message[0]).toBe(
          'email yesica.co is not valid or does not belong to the wolox domain'
        );
        done();
      });
  });
  it('validate password', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'err*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.body.message[0]).toBe(
          'email yesica.co is not valid or does not belong to the wolox domain'
        );
        done();
      });
  });
  it('validate required fields', done => {
    request(app)
      .post('/users')
      .send({})
      .set('Accept', 'application/json')
      .then(response => {
        const errors = [
          'email is required.',
          'password is required.',
          'name is required.',
          'Last name is required.'
        ];
        expect(response.statusCode).toString(errors);
        done();
      });
  });
});
