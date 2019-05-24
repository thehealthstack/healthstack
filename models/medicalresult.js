'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResult = sequelize.define('medicalresult', {
		medicalResultId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
    laboratoryId: DataTypes.STRING
  }, {});
  MedicalResult.associate = function(models) {
    MedicalResult.hasMany(models.medicalresultfile, { foreignKey: 'medicalResultId'});
  };
  return MedicalResult;
};
