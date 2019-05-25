'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
		adminId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'adminId has to be a uuid'
				}

			}
		},
		role: {
			type: DataTypes.ENUM,
			values: ['healthstack', 'lab agent'],
			validate: {
				isIn: {
					args: [['healthstack', 'lab agent']],
					msg: "Role must be either healthstack or lab agent"
				}
			}
		},
		password: {
			type: DataTypes.STRING
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
  Admin.associate = function(models) {
		Admin.belongsTo(models.organization, { foreignKey: 'organizationId'});
		Admin.hasMany(models.medicalresult, { foreignKey: 'adminId'});
		Admin.hasMany(models.transaction, { foreignKey: 'adminId'});
  };
  return Admin;
};
