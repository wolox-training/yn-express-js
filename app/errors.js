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

exports.SIGN_IN_ERROR = 'sign_in_error';
exports.signInError = message => internalError(message, exports.SIGN_IN_ERROR);

exports.VALIDATE_USER_ERROR = 'validate_user_error';
exports.validateUserError = message => internalError(message, exports.VALIDATE_USER_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
