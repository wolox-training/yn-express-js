const { checkBody } = require('express-validator');

exports.middlewareUsers = (req, res, next) => {
  checkBody(req.body.name, 'Name is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/blockchain');
  } else {
    req.session.success = true;
    res.redirect('/');
  }

  //   const errors = validateUser.validateUser(req);
  //   if (errors.length > 0) {
  //     throw error.validateUser(errors);
  //   }
  next();
};
