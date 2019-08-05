'use strict';
module.exports = {
  up: (queryInterface, sequelize) =>
    queryInterface.addColumn('users', 'administrator', {
      type: sequelize.BOOLEAN,
      allowNull: false
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'administrator')
};
