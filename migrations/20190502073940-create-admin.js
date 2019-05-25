'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
			return queryInterface.createTable('admins', {
				adminId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()')
				},
				role: {
					type: DataTypes.ENUM,
					values: ['healthstack', 'lab agent'],
				},
				password: {
					type: Sequelize.STRING
				},
				userId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'users',
						key: 'userId'
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
    return queryInterface.dropTable('admins');
  }
};
