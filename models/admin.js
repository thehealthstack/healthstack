'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    password: DataTypes.STRING,
    roles: DataTypes.ENUM
  }, {});
  Admin.associate = function(models) {
		Admin.belongsTo(models.Organization);
		Admin.hasMany(models.MedicalResult);
		Admin.hasMany(models.Transaction);
  };
  return Admin;
};
