'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient', {
	patientId: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: sequelize.literal('uuid_generate_v4()'),
		validate: {
			isUUID: {
				args: 4,
				msg: 'patientId has to be a uuid'
			}

		}
	},
	userId: {
		allowNull: false,
		type: DataTypes.UUID,
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
  Patient.associate = function(models) {
		Patient.hasMany(models.medicalresult, { foreignKey: 'patientId'});
		Patient.hasMany(models.transaction, { foreignKey: 'patientId'});
		Patient.belongsTo(models.user, { foreignKey: 'userId'})
  };
  return Patient;
};
