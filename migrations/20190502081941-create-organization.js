'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
			return queryInterface.createTable('organizations', {
				organizationId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()')
				},
				name: {
					type: Sequelize.STRING
				},
				telephone: {
					type: Sequelize.STRING
				},
				email: {
					type: Sequelize.STRING
				},
				location: {
					type: Sequelize.STRING
				},
				address: {
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
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organizations');
  }
};
