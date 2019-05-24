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
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					validate: {
						isUUID: {
							args: 4,
							msg: 'transactionId has to be a uuid'
						}

					}
				},
				emailTransactionStatus: {
					type: Sequelize.ENUM,
					values: ['accepted', 'success', 'failed'],
					validate: {
						isIn: {
							args: [['accepted', 'success', 'failed']],
							msg: "Email status must be either accepted, success or failed"
						}
					}
				},
				smsTransactionStatus: {
					type: Sequelize.ENUM,
					values: ['accepted', 'success', 'failed'],
					validate: {
						isIn: {
							args: [['accepted', 'success', 'failed']],
							msg: "Sms status must be either accepted, success or failed"
						}
					}
				},
				patientId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'patients',
						key: 'patientId'
					},
					validate: {
						isUUID: {
							args: 4,
							msg: 'patientId has to be a uuid'
						}

					}
				},
				medicalResultId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'medicalresults',
						key: 'medicalResultId'
					},
					validate: {
						isUUID: {
							args: 4,
							msg: 'medicalResultId has to be a uuid'
						}

					}
				},
				adminId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'admins',
						key: 'adminId'
					},
					validate: {
						isUUID: {
							args: 4,
							msg: 'adminId has to be a uuid'
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
    return queryInterface.dropTable('transactions');
  }
};
