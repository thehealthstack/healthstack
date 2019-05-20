'use strict';
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
  }, {});
  patient.associate = function(models) {
		patient.hasMany(models.medicalResult);
		patient.hasMany(models.transaction);
  };
  return patient;
};
