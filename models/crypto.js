'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crypto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  crypto.init({
    coin: DataTypes.STRING,
    name: DataTypes.STRING,
    last_trade_price: DataTypes.NUMBER,
    buy: DataTypes.NUMBER,
    sell: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'crypto',
  });
  return crypto;
};