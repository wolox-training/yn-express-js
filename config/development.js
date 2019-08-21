exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    jwt: {
      secret: process.env.SECRET
    },
    tokens: {
      expiration: process.env.EXPIRATION_DEV
    }
  },
  isDevelopment: true
};
