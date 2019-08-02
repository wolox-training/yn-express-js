const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js'),
  { factoryCreate } = require('../test/utils.test');

const resultUserList = [
  {
    id: 1,
    name: 'yesica',
    lastName: 'nava',
    email: 'yesica@wolox.co',
    password: '$2a$10$2I6Lrhhs6cd7PNl10qV6YueEU8yL.2D1E4Y8BUG6Pja5sswhindG6',
    created_at: '2019-07-25T21:50:47.143Z',
    updated_at: '2019-07-25T21:50:47.143Z',
    deleted_at: null
  }
];

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
          expect(response.statusCode).toBe(401);
          expect(response.text).toString(errorTest);
          done();
        });
    });
  });
});

describe('user list test', () => {
  it('should get the user list', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(() => {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
        'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8';
      request(app)
        .get('/users?page=1&pageSize=5')
        .set({ Accept: 'application/json', Authorization: token })
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toString(resultUserList);
          dictum.chai(response, 'should sign in with all the fields correctly');
          done();
        });
    });
  });

  it('should get the list of users with the parameter = page', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(() => {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
        'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8';
      request(app)
        .get('/users?page=1')
        .set({ Accept: 'application/json', Authorization: token })
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toString(resultUserList);
          done();
        });
    });
  });

  it('should get the list of users with the parameter = page and pageSize', done => {
    testCreate('yesica@wolox.co', 'shdfgs345').then(() => {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inllc2ljYUB3b2' +
        'xveC5jbyJ9.W94vf6ymuks9qEsz-dDciig304QtAa7FeUjlNqwXaI8';
      request(app)
        .get('/users?page=1&?pageSize=7')
        .set({ Accept: 'application/json', Authorization: token })
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toString(resultUserList);
          done();
        });
    });
  });

  it('should not get user list', done => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message.msg).toBe('Authorization is required');
        done();
      });
  });
});

describe('register administrator, with their respective fields', () => {
  beforeEach(() =>
    factoryCreate({
      name: 'sofia',
      lastName: 'arismendy',
      email: 'sofia@wolox.co',
      password: 'yuli35624',
      administrator: true
    })
  );
  it('should register administrator with all the fields correctly', done => {
    request(app)
      .post('/users/sessions')
      .send({ email: 'sofia@wolox.co', password: 'yuli35624' })
      .set('Accept', 'application/json')
      .then(response => {
        const tokenResponse = JSON.parse(response.text);
        request(app)
          .post('/admin/users')
          .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set({ Accept: 'application/json', Authorization: tokenResponse.token })
          .then(result => {
            expect(result.statusCode).toBe(201);
            expect(result.text).toBe('the administrator user was created correctly');
            dictum.chai(response, 'should register administrator with all the fields correctly');
            done();
          });
      });
  });
});
describe('user register, with user without permissions that does not have permissions', () => {
  beforeEach(() =>
    factoryCreate({
      name: 'sofia',
      lastName: 'arismendy',
      email: 'sofia@wolox.co',
      password: 'yuli35624',
      administrator: false
    })
  );
  it('should not sign up administrator', done => {
    request(app)
      .post('/users/sessions')
      .send({ email: 'sofia@wolox.co', password: 'yuli35624' })
      .set('Accept', 'application/json')
      .then(response => {
        const tokenResponse = JSON.parse(response.text);
        request(app)
          .post('/admin/users')
          .send({ name: 'yesica', lastName: 'nava', email: 'yesica@wolox.co', password: 'shdfgs345' })
          .set({ Accept: 'application/json', Authorization: tokenResponse.token })
          .then(result => {
            expect(result.statusCode).toBe(503);
            expect(result.body.message).toBe('You do not have permissions to perform this operation');
            done();
          });
      });
  });
});
