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

exports.CREATE_ADMIN_ERROR = 'create_admin_error';
exports.createAdminError = message => internalError(message, exports.CREATE_ADMIN_ERROR);

exports.SIGN_IN_ERROR = 'sign_in_error';
exports.signInError = message => internalError(message, exports.SIGN_IN_ERROR);

exports.VALIDATE_USER_ERROR = 'validate_user_error';
exports.validateUserError = message => internalError(message, exports.VALIDATE_USER_ERROR);

exports.BUY_ALBUMS_ERROR = 'buy_albums_error';
exports.buyAlbumsError = message => internalError(message, exports.BUY_ALBUMS_ERROR);

exports.USER_ALBUMS_LIST_ERROR = 'user_albums_list_error';
exports.userAlbumsListError = message => internalError(message, exports.USER_ALBUMS_LIST_ERROR);

exports.VALIDATE_TOKEN_ERROR = 'validate_token_error';
exports.validateTokenError = message => internalError(message, exports.VALIDATE_TOKEN_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
