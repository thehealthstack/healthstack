'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('organization', {
		organizationId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
		address: DataTypes.STRING,
		status: {
			type: DataTypes.ENUM,
			values: ['active', 'pending']
		}
  }, {});
  Organization.associate = function(models) {
		Organization.hasMany(models.medicalresult, { foreignKey: 'organizationId'});
  };
  return Organization;
};
