'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicalResultFile = sequelize.define('medicalresultfile', {
    fileUrl: DataTypes.TEXT
  }, {});
  medicalResultFile.associate = function(models) {
		// associations can be defined here
  };
  return medicalResultFile;
};
