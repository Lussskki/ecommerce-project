const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(connection) {
    super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      },

      condition: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      state: { 
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      productSize: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize: connection,
      tableName: 'products',
      timestamps: true,
      updatedAt: false
    });
  }
}

module.exports = Product;