'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      ID: DataTypes.INTEGER,
      Nombre: DataTypes.STRING,
      Apellido: DataTypes.STRING,
      Email: DataTypes.STRING,
      Contrasea: DataTypes.STRING
    },
    {}
  );
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};
