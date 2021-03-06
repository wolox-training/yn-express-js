exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    jwt: {
      secret: process.env.SECRET
    },
    tokens: {
      expiration: process.env.EXPIRATION
    }
  },
  isProduction: true
};
