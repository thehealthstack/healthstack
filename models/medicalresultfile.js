'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalResultFile = sequelize.define('MedicalResultFile', {
    fileUrl: DataTypes.TEXT
  }, {});
  MedicalResultFile.associate = function(models) {
		// associations can be defined here
  };
  return MedicalResultFile;
};
