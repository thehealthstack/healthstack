'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResult = sequelize.define('MedicalResult', {
    laboratoryId: DataTypes.STRING
  }, {});
  MedicalResult.associate = function(models) {
    // associations can be defined here
  };
  return MedicalResult;
};