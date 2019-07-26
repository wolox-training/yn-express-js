const request = require('supertest'),
  app = require('../app');
describe('User registration test, with their respective fields', () => {
  it('he user should register with all the fields correctly', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('the user was created correctly');
        done();
      });
  });

  it('the user should not register because the email is incorrect', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'shdfgs345*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message[0]).toBe(
          'email yesica.co is not valid or does not belong to the wolox domain'
        );
        done();
      });
  });

  it('the user should not register because the password is incorrect', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'err*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message[0]).toBe(
          'email yesica.co is not valid or does not belong to the wolox domain'
        );
        done();
      });
  });

  it('the user should not register because no required parameter is sent', done => {
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
        expect(response.statusCode).toBe(400);
        expect(response.statusCode).toString(errors);
        done();
      });
  });
});
