'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
			return queryInterface.createTable('medicalresults', {
				medicalResultId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()')
				},
				adminId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'admins',
						key: 'adminId'
					}
				},
				patientId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'patients',
						key: 'patientId'
					}
				},
				organizationId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'organizations',
						key: 'organizationId'
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
    return queryInterface.dropTable('medicalresults');
  }
};
