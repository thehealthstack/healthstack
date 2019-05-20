'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    emailTransactionStatus: DataTypes.ENUM('success', 'failed'),
    smsTransactionStatus: DataTypes.ENUM('success', 'failed')
  }, {});
  transaction.associate = function(models) {
    transaction.belongsTo(models.medicalResult);
  };
  return transaction;
};
