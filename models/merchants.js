'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Merchants.init({
    fullName: DataTypes.STRING,
    merchantID: DataTypes.STRING,
    walletBalance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchants',
  });
  return Merchants;
};