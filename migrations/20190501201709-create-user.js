'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
			},
			status: {
				type: Sequelize.ENUM,
				values: ['active', 'pending']
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
    return queryInterface.dropTable('Users');
  }
};
