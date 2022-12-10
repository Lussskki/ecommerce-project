const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

class Product_type extends Model {
  static init(connection) {
    super.init({
      product_type: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    }, {
      sequelize: connection,
      tableName: 'product_types',      
      timestamps: true
    });
  }

}

module.exports = Product_type;