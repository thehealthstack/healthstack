'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Admins', {
      adminId: {
        allowNull: false,
        primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
      },
      password: {
        type: Sequelize.STRING
      },
      roles: {
				type: Sequelize.ENUM,
				values: ['lab agent', 'healthstack']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Admins');
  }
};
