'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
  }, {});
  Patient.associate = function(models) {
		Patient.hasMany(models.MedicalResult);
		Patient.hasMany(models.Transaction);
  };
  return Patient;
};
