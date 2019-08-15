const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  configDevelopment = require('../../config'),
  { secret } = configDevelopment.common.jwt,
  servicesAlbums = require('../services/albums'),
  config = require('../../config'),
  { url } = config.common.apiAlbums,
  { expiration } = config.common.tokens,
  nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'dulceamorbeauty@gmail.com',
    pass: '3116299415yesica'
  }
});

const sendEmail = async () => {
  console.log('llegue');
  console.log(transporter);
  const info = await transporter.sendMail({
    from: '"Yesica nava" <yesicanava56@gmail.com>',
    to: 'yesicanava56@gmail.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  });
  console.log(info);
  return info;
};
const upsert = userData =>
  User.upsert(userData, { where: { email: userData.email } })
    .then(result => {
      logger.info(`the user was update correctly: ${userData.name}`);
      return result;
    })
    .catch(err => {
      logger.error(`Could not update user: ${name}`);
      throw error.databaseError(err.message);
    });

const update = (dateToken, email) =>
  User.update({ dateToken }, { where: { email } }).catch(err => {
    logger.error(`Could not update user: ${err}`);
    throw error.databaseError(err.message);
  });

exports.getUser = email =>
  User.findOne({
    where: { email },
    attributes: ['id']
  }).catch(err => {
    throw error.databaseError(err.message);
  });

exports.validateToken = ({ email, iat }) =>
  User.findAndCountAll({
    where: { email },
    attributes: ['dateToken']
  })
    .then(result => {
      if (result.count !== 1) {
        throw error.validateTokenError('invalid Token ');
      }
      if (result.count === 1) {
        if (result.rows[0].dataValues.dateToken !== null) {
          if (iat < result.rows[0].dataValues.dateToken) {
            throw error.validateTokenError('invalid Token ');
          }
        }
        const seconds = Math.floor(Date.now() / 1000) - Math.floor(iat / 1000);
        if (expiration < seconds) {
          throw error.validateTokenError('the token has expired');
        }
      }
    })
    .catch(err => {
      throw error.databaseError(err.message);
    });

exports.createUser = userData =>
  User.create(userData)
    .then(result => {
      logger.info(`the user was created correctly: ${userData.name}`);
      return result;
    })
    .then(() => sendEmail())
    .then(info => {
      console.log(info);
      return info;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('User already exists');
        throw error.signUpError('User already exists');
      }
      logger.error(`Could not create user: ${userData.name}`);
      throw error.databaseError(err.message);
    });

exports.signIn = async ({ email, password }) => {
  try {
    const result = await User.findOne({
      where: { email },
      attributes: ['email', 'password', 'administrator']
    });
    const compare = await bcrypt.compare(password, result.password);
    if (compare !== true) {
      throw error.signInError('email or password incorrect');
    }
    const bodyToken = {
      email,
      administrator: result.administrator,
      iat: Date.now()
    };
    const token = { token: jwt.encode(bodyToken, secret), expiresAt: expiration };
    return token;
  } catch (err) {
    throw err;
  }
};

exports.userList = ({ page = 0, pageSize = 5 }) => {
  const offset = pageSize * page,
    limit = pageSize;
  return User.findAll({ offset, limit })
    .then(result => result)
    .catch(err => {
      throw error.databaseError(err.message);
    });
};

exports.createUserAdmin = userData => {
  userData.administrator = true;
  return upsert(userData);
};

exports.userAlbumsList = async req => {
  try {
    if (req.body.decode.administrator !== true) {
      const user = await exports.getUser(req.body.decode.email);
      if (user.id !== parseInt(req.params.user_id)) {
        throw error.userAlbumsListError('you can only see your albums');
      }
    }
    return await servicesAlbums.getAlbumsListByIdUser(req.params.user_id);
  } catch (err) {
    throw err;
  }
};

exports.userAlbumPhotosList = async req => {
  try {
    const albumId = req.params.id;
    const user = await exports.getUser(req.body.decode.email);
    const purchasedAlbum = await servicesAlbums.albumPurchased(albumId, user.id);
    if (purchasedAlbum !== true) {
      throw error.userAlbumPhotosListError("you can't see the photos from this album");
    }
    const source = `${url}/photos?albumId=${albumId}`;
    return await servicesAlbums.getAlbumSources(source);
  } catch (err) {
    throw err;
  }
};

exports.disableAllSessions = req =>
  update(Date.now(), req.body.decode.email).catch(err => {
    logger.error(err);
    throw error.disableAllSessionsError(err.message);
  });
