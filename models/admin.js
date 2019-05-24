'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
		adminId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
		userId: {
			type: DataTypes.UUID,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
    password: DataTypes.STRING,
  }, {});
  Admin.associate = function(models) {
		Admin.belongsTo(models.organization, { foreignKey: 'organizationId'});
		Admin.hasMany(models.medicalresult, { foreignKey: 'adminId'});
		Admin.hasMany(models.transaction, { foreignKey: 'adminId'});
  };
  return Admin;
};
