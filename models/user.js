'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
		userId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'userId has to be a uuid'
				}

			}
		},
		firstName: {
			type: DataTypes.STRING,
			validate: {
				is: {
					args: ["^[a-z]+$",'i'],
					msg: 'firstName accepts only letters'
				}
			}
		},
		lastName: {
			type: DataTypes.STRING,
			validate: {
				is: {
					args: ["^[a-z]+$",'i'],
					msg: 'lastName accepts only letters'
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
		role: {
			type: DataTypes.ENUM,
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
  User.associate = function(models) {
		User.hasOne(models.patient, { foreignKey: 'userId'});
		User.hasOne(models.admin, { foreignKey: 'userId' });
  };
  return User;
};
