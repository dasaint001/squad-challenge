'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionDetails.init({
    transactionID: DataTypes.STRING,
    merchantID: DataTypes.STRING,
    accountName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    feePercentage: DataTypes.STRING,
    subTotal: DataTypes.STRING,
    totalAmount: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    currency: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    cardHolder: DataTypes.STRING,
    expirationDate: DataTypes.STRING,
    CVV: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionDetails',
  });
  return TransactionDetails;
};