'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
		address: DataTypes.STRING,
		status: DataTypes.ENUM
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};
