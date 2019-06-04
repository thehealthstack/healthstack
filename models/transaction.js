'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
		transactionId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: sequelize.literal('uuid_generate_v4()'),
			validate: {
				isUUID: {
					args: 4,
					msg: 'transactionId has to be a uuid'
				}

			}
		},
		emailTransactionStatus: {
			type: DataTypes.ENUM,
			values: ['accepted', 'success', 'failed'],
			validate: {
				isIn: {
					args: [['accepted', 'success', 'failed']],
					msg: "Email status must be either accepted, success or failed"
				}
			}
		},
		smsTransactionStatus: {
			type: DataTypes.ENUM,
			values: ['accepted', 'success', 'failed'],
			validate: {
				isIn: {
					args: [['accepted', 'success', 'failed']],
					msg: "Sms status must be either accepted, success or failed"
				}
			}
		},
		emailMessageId: {
			type: DataTypes.STRING,
			unique: true
		},
		smsMessageId: {
			type: DataTypes.STRING,
			unique: true
		},
		patientId: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'patients',
				key: 'patientId'
			},
			validate: {
				isUUID: {
					args: 4,
					msg: 'patientId has to be a uuid'
				}

			}
		},
		medicalResultId: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'medicalresults',
				key: 'medicalResultId'
			},
			validate: {
				isUUID: {
					args: 4,
					msg: 'medicalResultId has to be a uuid'
				}

			}
		},
		adminId: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'admins',
				key: 'adminId'
			},
			validate: {
				isUUID: {
					args: 4,
					msg: 'adminId has to be a uuid'
				}

			}
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			validate: {
				isDate: {
					args: true,
					msg: 'createdAt has to be a date string'
				}
			}
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			validate: {
				isDate: {
					args: true,
					msg: 'updatedAt has to be a date string'
				}
			}
		}
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.medicalresult, { foreignKey: 'medicalResultId'});
  };
  return Transaction;
};
