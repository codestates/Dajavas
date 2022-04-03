'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fish.init({
    fish_name: DataTypes.STRING,
    src: DataTypes.STRING,
    size: DataTypes.INTEGER,
    ranked: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fish',
  });
  return fish;
};