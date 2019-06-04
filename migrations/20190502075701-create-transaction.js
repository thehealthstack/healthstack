'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
			return queryInterface.createTable('transactions', {
				transactionId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()')
				},
				emailTransactionStatus: {
					type: Sequelize.ENUM,
					values: ['accepted', 'success', 'failed']
				},
				smsTransactionStatus: {
					type: Sequelize.ENUM,
					values: ['accepted', 'success', 'failed']
				},
				emailMessageId: {
					type: Sequelize.STRING,
					unique: true
				},
				smsMessageId: {
					type: DataTypes.STRING,
					unique: true
				},
				patientId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'patients',
						key: 'patientId'
					}
				},
				medicalResultId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'medicalresults',
						key: 'medicalResultId'
					}
				},
				adminId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'admins',
						key: 'adminId'
					}
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
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};
