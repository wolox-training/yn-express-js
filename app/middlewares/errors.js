const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.ALBUMS_API_ERROR]: 503,
  [errors.SIGN_UP_ERROR]: 400,
  [errors.SIGN_IN_ERROR]: 401,
  [errors.VALIDATE_USER_ERROR]: 400,
  [errors.DEFAULT_ERROR]: 500,
  [errors.VALIDATE_TOKEN_ERROR]: 401,
  [errors.CREATE_ADMIN_ERROR]: 400,
  [errors.BUY_ALBUMS_ERROR]: 400,
  [errors.USER_ALBUMS_LIST_ERROR]: 400,
  [errors.USER_ALBUMS_PHOTOS_LIST_ERROR]: 400,
  [errors.DISABLE_ALL_SESSIONS_ERROR]: 400
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
