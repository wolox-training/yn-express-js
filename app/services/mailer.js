const nodemailer = require('nodemailer'),
  config = require('../../config'),
  error = require('../errors');

const transporter = nodemailer.createTransport({
  host: config.common.mailer.host,
  port: config.common.mailer.port,
  auth: {
    user: config.common.mailer.user,
    pass: config.common.mailer.password
  }
});

exports.sendMail = mailOptions =>
  transporter.sendMail(mailOptions).catch(err => {
    throw error.sendEmailError(err.message);
  });
