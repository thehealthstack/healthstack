'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    password: DataTypes.STRING,
    roles: DataTypes.ENUM
  }, {});
  admin.associate = function(models) {
		admin.belongsTo(models.organization);
		admin.hasMany(models.medicalResult);
		admin.hasMany(models.transaction);
  };
  return admin;
};
