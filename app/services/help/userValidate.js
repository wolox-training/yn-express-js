const domain = /^(([^<>\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.(co|com|com.ar)\s*$/,
  password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

exports.validateUser = userData => {
  const errors = [];
  if (!userData.body.email) {
    errors.push('email is required.');
  } else if (!domain.test(userData.body.email)) {
    errors.push(`email ${userData.body.email} is not valid or does not belong to the wolox domain`);
  }
  if (!userData.body.password) {
    errors.push('password is required.');
  } else if (!password.test(userData.body.password)) {
    errors.push('password must have at least 8 alphanumeric characters.');
  }
  if (!userData.body.name) {
    errors.push('name is required.');
  }
  if (!userData.body.lastName) {
    errors.push('Last name is required.');
  }
  return errors;
};
