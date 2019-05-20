'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicalResult = sequelize.define('medicalResult', {
    laboratoryId: DataTypes.STRING
  }, {});
  medicalResult.associate = function(models) {
    medicalResult.hasMany(models.medicalResultFile);
  };
  return medicalResult;
};
