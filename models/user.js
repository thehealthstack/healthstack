'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
		userId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
		telephone: DataTypes.STRING,
		status: {
			type: DataTypes.ENUM,
			values: ['active', 'pending']
		},
		role: {
			type: DataTypes.ENUM,
			values: ['patient', 'healthstack', 'lab agent']
		}
  }, {});
  User.associate = function(models) {
		User.hasOne(models.patient, { foreignKey: 'userId'});
		User.hasOne(models.admin, { foreignKey: 'userId'});
  };
  return User;
};
