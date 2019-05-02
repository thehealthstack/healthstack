'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};
