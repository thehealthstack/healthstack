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
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					validate: {
						isUUID: {
							args: 4,
							msg: 'adminId has to be a uuid'
						}

					}
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
					},
					validate: {
						isUUID: {
							args: 4,
							msg: 'userId has to be a uuid'
						}

					}
				},
				organizationId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'organizations',
						key: 'organizationId'
					},
					validate: {
						isUUID: {
							args: 4,
							msg: 'organizationId has to be a uuid'
						}

					}
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					validate: {
						isDate: {
							args: true,
							msg: 'createdAt has to be a date string'
						}
					}
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					validate: {
						isDate: {
							args: true,
							msg: 'updatedAt has to be a date string'
						}
					}
				}
			});
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admins');
  }
};
