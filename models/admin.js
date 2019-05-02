'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    password: DataTypes.STRING,
    roles: DataTypes.ENUM
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};
