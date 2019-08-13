'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      administrator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dateToken: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'date_token',
        defaultValue: Math.floor(new Date() / 1000)
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Album, {
      foreignKey: 'userId'
    });
  };

  return User;
};
