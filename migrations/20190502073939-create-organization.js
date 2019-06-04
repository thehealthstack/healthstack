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
					type: Sequelize.STRING,
					unique: true
				},
				telephone: {
					type: Sequelize.STRING,
					unique: true
				},
				email: {
					type: Sequelize.STRING,
					unique: true
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
				category: {
					type: Sequelize.ENUM,
					values: ['admin', 'laboratory', 'hospital', 'pharmacy']
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
