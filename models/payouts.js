'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payouts.init({
    merchantID: DataTypes.STRING,
    cardTotal: DataTypes.STRING,
    virtualTotal: DataTypes.STRING,
    sumTotal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payouts',
  });
  return Payouts;
};