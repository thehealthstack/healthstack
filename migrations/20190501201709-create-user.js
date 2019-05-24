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
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					validate: {
						isUUID: {
							args: 4,
							msg: 'userId has to be a uuid'
						}

					}
				},
				firstName: {
					type: Sequelize.STRING,
					validate: {
						is: {
							args: ["^[a-z]+$",'i'],
							msg: 'firstName accepts only letters'
						}
					}
				},
				lastName: {
					type: Sequelize.STRING,
					validate: {
						is: {
							args: ["^[a-z]+$",'i'],
							msg: 'lastName accepts only letters'
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
				role: {
					type: Sequelize.ENUM,
					values: ['patient', 'healthstack', 'lab agent'],
					validate: {
						isIn: {
							args: [['patient', 'healthstack', 'lab agent']],
							msg: "Role must be either patient, healthstack or lab agent"
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
    return queryInterface.dropTable('users');
  }
};
