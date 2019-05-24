'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient', {
		patientId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		}
  }, {});
  Patient.associate = function(models) {
		Patient.hasMany(models.medicalresult, { foreignKey: 'patientId'});
		Patient.hasMany(models.transaction, { foreignKey: 'patientId'});
  };
  return Patient;
};
