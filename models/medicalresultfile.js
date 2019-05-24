'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResultFile = sequelize.define('medicalresultfile', {
		medicalResultFileId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
    fileUrl: DataTypes.TEXT
  }, {});
  MedicalResultFile.associate = function(models) {
		// associations can be defined here
  };
  return MedicalResultFile;
};
