'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalResults', {
      medicalResultId: {
        allowNull: false,
        primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
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
    return queryInterface.dropTable('MedicalResults');
  }
};
