'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
		telephone: DataTypes.STRING,
		status: DataTypes.ENUM
  }, {});
  User.associate = function(models) {
		User.hasOne(models.Patient);
		User.hasOne(models.Admin);
  };
  return User;
};
