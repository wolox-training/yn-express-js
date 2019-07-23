const re = /^(([^<>\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.co\s*$/,
  password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
let error = [];
exports.validateUser = userData => {
  error = [];
  if (!userData.email) {
    error.push('el email es obligatorio.');
  } else if (!re.test(userData.email)) {
    error.push(`El email ${userData.email} no es valido ó no pertenece al dominio de wolox.`);
  }
  if (!userData.password) {
    error.push('la contraseña es obligatorio.');
  } else if (!password.test(userData.password)) {
    error.push('la contraseña debe tener mínimo 8 caracteres alfanumericos.');
  }
  if (!userData.name) {
    error.push('el nombre es obligatorio.');
  }
  if (!userData.lastName) {
    error.push('el apellido es obligatorio.');
  }
  return error;
};
