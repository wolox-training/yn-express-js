const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.ALBUMS_API_ERROR = 'albums_api_error';
exports.albumsApiError = message => internalError(message, exports.ALBUMS_API_ERROR);

exports.SIGN_UP_ERROR = 'sign_up_error';
exports.signUpError = message => internalError(message, exports.SIGN_UP_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
