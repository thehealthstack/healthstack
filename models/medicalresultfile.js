'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResultFile = sequelize.define('medicalresultfile', {
		medicalResultFileId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'medicalResultFileId has to be a uuid'
				}

			}
		},
		fileUrl: {
			type: DataTypes.TEXT,
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
			type: DataTypes.UUID,
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
			type: DataTypes.DATE,
			validate: {
				isDate: {
					args: true,
					msg: 'createdAt has to be a date string'
				}
			}
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			validate: {
				isDate: {
					args: true,
					msg: 'updatedAt has to be a date string'
				}
			}
		}
  }, {});
  MedicalResultFile.associate = function(models) {
		// associations can be defined here
  };
  return MedicalResultFile;
};
