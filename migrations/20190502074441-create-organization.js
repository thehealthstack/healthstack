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
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					validate: {
						isUUID: {
							args: 4,
							msg: 'organizationId has to be a uuid'
						}

					}
				},
				name: {
					type: Sequelize.STRING,
					unique: true,
					validate: {
						is: {
							args: ["^[a-z]+$",'i'],
							msg: 'name accepts only letters'
						}
					}
				},
				telephone: {
					type: Sequelize.STRING,
					unique: true,
					validate: {
						is: {
							args: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
							msg: 'telephone number format is not valid'
						}
					}
				},
				email: {
					type: Sequelize.STRING,
					unique: true,
					validate: {
						isEmail: {
							args: true,
							msg: 'email format not valid'
						}
					}
				},
				location: {
					type: Sequelize.STRING
				},
				address: {
					type: Sequelize.STRING
				},
				status: {
					type: Sequelize.ENUM,
					values: ['active', 'pending'],
					validate: {
						isIn: {
							args: [['active', 'pending']],
							msg: "status must be either pending or active"
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
    return queryInterface.dropTable('organizations');
  }
};
