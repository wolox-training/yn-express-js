const domain = /^(([^<>\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.co\s*$/,
  password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
let errors = [];

exports.validateUser = userData => {
  errors = [];
  if (!userData.email) {
    errors.push('email is required.');
  } else if (!domain.test(userData.email)) {
    errors.push(`email ${userData.email} is not valid or does not belong to the wolox domain`);
  }
  if (!userData.password) {
    errors.push('password is required.');
  } else if (!password.test(userData.password)) {
    errors.push('password must have at least 8 alphanumeric characters.');
  }
  if (!userData.name) {
    errors.push('name is required.');
  }
  if (!userData.lastName) {
    errors.push('Last name is required.');
  }
  return errors;
};
