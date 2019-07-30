const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js');

const testCreate = (email, password) =>
  request(app)
    .post('/users')
    .send({ name: 'yesica', lastName: 'nava', email, password })
    .set('Accept', 'application/json');

describe('User registration test, with their respective fields', () => {
  it('should register with all the fields correctly', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.text).toBe('the user was created correctly');
      dictum.chai(response, 'should register with all the fields correctly');
      done();
    });
  });

  it('should not register because the email is incorrect', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica.co', password: 'shdfgs345' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.msg).toBe('Invalid value');
        done();
      });
  });

  it('should not register because the email not belong to the wolox domain', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@gmail.co', password: 'shdfgs345' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.msg).toBe('email is not valid or does not belong to the wolox domain');
        done();
      });
  });

  it('should not register because the password not is alphanumeric', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'err34*' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.msg).toBe('Must be only alphanumeric chars');
        done();
      });
  });

  it('should not register because the password not 8 chars long', done => {
    request(app)
      .post('/users')
      .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'err34' })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.msg).toBe('Must be at least 8 chars long');
        done();
      });
  });

  it('should not register because no required parameter is sent', done => {
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

describe('User sign in test, with their respective fields', () => {
  it('should sign in with all the fields correctly', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(() => {
      request(app)
        .post('/users/sessions')
        .send({ email: 'yesica@wolox.co', password: 'shdfgs345' })
        .set('Accept', 'application/json')
        .then(response => {
          const token = {
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
              'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8'
          };
          expect(response.statusCode).toBe(200);
          expect(response.text).toString(token);
          dictum.chai(response, 'should sign in with all the fields correctly');
          done();
        });
    });
  });

  it('should not sign in with all the fields correctly', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(() => {
      request(app)
        .post('/users/sessions')
        .send({ email: 'yesica@wolox.co', password: 'hagsdhjada45674' })
        .set('Accept', 'application/json')
        .then(response => {
          const errorTest = {
            message: 'email or password incorrect'
          };
          expect(response.statusCode).toBe(400);
          expect(response.text).toString(errorTest);
          done();
        });
    });
  });
});
