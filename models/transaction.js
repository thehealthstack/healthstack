'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
		transactionId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()')
		},
    emailTransactionStatus: {
			type: DataTypes.ENUM,
			values: ['accepted', 'success', 'failed']
		},
    smsTransactionStatus: {
			type: DataTypes.ENUM,
			values: ['accepted', 'success', 'failed']
		}
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.medicalresult, { foreignKey: 'adminId'});
  };
  return Transaction;
};
