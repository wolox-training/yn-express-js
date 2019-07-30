exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    jwt: {
      secret: process.env.SECRET
    },
    session: {
      secret: 'some-super-secret'
    }
  }
};
