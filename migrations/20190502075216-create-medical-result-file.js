'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
			return queryInterface.createTable('medicalresultfiles', {
				medicalResultFileId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					validate: {
						isUUID: {
							args: 4,
							msg: 'medicalResultFileId has to be a uuid'
						}

					}
				},
				fileUrl: {
					type: Sequelize.TEXT,
					unique: true,
					validate: {
						isUrl: {
							args: true,
							msg: 'fileUrl has to be a valid URL'
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
    return queryInterface.dropTable('medicalresultfiles');
  }
};
