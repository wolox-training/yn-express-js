// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { SignUp } = require('./controllers/users');
exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', SignUp, () => 'error');
};
