'use strict';
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
		address: DataTypes.STRING,
		status: DataTypes.ENUM
  }, {});
  organization.associate = function(models) {
    organization.hasMany(models.medicalResult);
  };
  return organization;
};
