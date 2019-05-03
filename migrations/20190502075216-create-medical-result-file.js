'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalResultFiles', {
      medicalResultFileId: {
        allowNull: false,
        primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
      },
      fileUrl: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('MedicalResultFiles');
  }
};
