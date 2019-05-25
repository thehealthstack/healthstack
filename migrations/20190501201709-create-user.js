'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
			return queryInterface.createTable('users', {
				userId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()')
				},
				firstName: {
					type: Sequelize.STRING
				},
				lastName: {
					type: Sequelize.STRING
				},
				email: {
					type: Sequelize.STRING,
					unique: true
				},
				telephone: {
					type: Sequelize.STRING,
					unique: true
				},
				status: {
					type: Sequelize.ENUM,
					values: ['active', 'pending']
				},
				role: {
					type: Sequelize.ENUM,
					values: ['patient', 'healthstack', 'lab agent']
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
    return queryInterface.dropTable('users');
  }
};
