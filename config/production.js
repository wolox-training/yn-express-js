exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    jwt: {
      secret: process.env.SECRET
    }
  },
  isProduction: true
};
