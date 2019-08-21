'use strict';
module.exports = {
  up: (queryInterface, sequelize) =>
    queryInterface.addColumn('users', 'date_token', {
      type: sequelize.BIGINT,
      allowNull: true
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'date_token')
};
