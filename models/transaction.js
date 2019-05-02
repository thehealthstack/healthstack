'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    emailTransactionStatus: DataTypes.ENUM('success', 'failed'),
    smsTransactionStatus: DataTypes.ENUM('success', 'failed')
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};
