'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResult = sequelize.define('medicalresult', {
		medicalResultId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'medicalResultId has to be a uuid'
				}

			}
		},
		adminId: {
			allowNull: false,
			type: DataTypes.UUID,
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
		patientId: {
			allowNull: false,
			type: DataTypes.UUID,
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
		organizationId: {
			allowNull: false,
			type: DataTypes.UUID,
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
  MedicalResult.associate = function(models) {
    MedicalResult.hasMany(models.medicalresultfile, { foreignKey: 'medicalResultId'});
  };
  return MedicalResult;
};
