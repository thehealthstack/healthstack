'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('organization', {
		organizationId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'organizationId has to be a uuid'
				}

			}
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		telephone: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				is: {
					args: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
					msg: 'telephone number format is not valid'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: {
					args: true,
					msg: 'email format not valid'
				}
			}
		},
		location: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.ENUM,
			values: ['active', 'pending'],
			validate: {
				isIn: {
					args: [['active', 'pending']],
					msg: "status must be either pending or active"
				}
			}
		},
		category: {
			type: DataTypes.ENUM,
			values: ['admin', 'laboratory', 'hospital', 'pharmacy'],
			validate: {
				isIn: {
					args: [['admin', 'laboratory', 'hospital', 'pharmacy']],
					msg: "category must be either admin, laboratory, hospital or pharmacy"
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
  Organization.associate = function(models) {
		Organization.hasMany(models.medicalresult, { foreignKey: 'organizationId'});
		Organization.hasMany(models.admin, { foreignKey: 'organizationId'});
  };
  return Organization;
};
