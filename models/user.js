'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
		telephone: DataTypes.STRING,
		status: DataTypes.ENUM
  }, {});
  user.associate = function(models) {
		user.hasOne(models.patient);
		user.hasOne(models.admin);
  };
  return user;
};
